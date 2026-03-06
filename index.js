require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');
const { 
    joinVoiceChannel, createAudioPlayer, createAudioResource, 
    AudioPlayerStatus, StreamType, EndBehaviorType 
} = require('@discordjs/voice');
const { OpenAI } = require('openai');
const Groq = require('groq-sdk');
const discordTTS = require('discord-tts');
const prism = require('prism-media');
const fs = require('fs');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

client.once('clientReady', () => console.log('🚀 Mustan Alexa aguardando comando !conectar...'));

client.on('messageCreate', async (message) => {
    if (message.content === '!conectar') {
        const channel = message.member.voice.channel;
        if (!channel) return message.reply("Entre no canal de voz!");

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: message.guild.id,
            adapterCreator: message.guild.voiceAdapterCreator,
            selfDeaf: false,
            selfMute: false,
        });

        console.log(`📡 Conectado! Agora me chame por "Mustan"...`);

        // ESCUTANDO SEMPRE
        connection.receiver.speaking.on('start', (userId) => {
            if (userId === client.user.id) return;

            // Log imediato para saber se ele detectou som
            console.log(`🎤 [OUVINDO] Detectei voz do usuário ${userId}...`);

            const audioStream = connection.receiver.subscribe(userId, {
                end: { behavior: EndBehaviorType.AfterSilence, duration: 1200 },
            });

            const pcmPath = `./temp_${userId}.wav`;
            const out = fs.createWriteStream(pcmPath);
            const opusDecoder = new prism.opus.Decoder({ frameSize: 960, channels: 2, rate: 48000 });
            
            audioStream.pipe(opusDecoder).pipe(out);

            out.on('finish', async () => {
                try {
                    const transcription = await openai.audio.transcriptions.create({
                        file: fs.createReadStream(pcmPath),
                        model: "whisper-1",
                    });

                    const falaDoUsuario = transcription.text;
                    console.log(`📝 [TERMINAL] Você disse: "${falaDoUsuario}"`);

                    // LÓGICA DA PALAVRA DE ATIVAÇÃO
                    if (falaDoUsuario.toLowerCase().includes('mustan')) {
                        console.log('✨ [ATIVADO] Nome detectado! Gerando resposta...');
                        
                        const aiResponse = await groq.chat.completions.create({
                            messages: [
                                { role: 'system', content: 'Você é o Mustan, uma assistente rápida e amigável.' },
                                { role: 'user', content: falaDoUsuario }
                            ],
                            model: 'llama-3.3-70b-versatile',
                        });

                        const respostaIA = aiResponse.choices[0].message.content;
                        const stream = discordTTS.getVoiceStream(respostaIA, 'pt-BR');
                        const player = createAudioPlayer();
                        const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true });
                        
                        player.play(resource);
                        connection.subscribe(player);
                    } else {
                        console.log('🔇 [IGNORADO] Você não disse "Mustan".');
                    }

                } catch (err) {
                    console.error("❌ Erro no processamento:", err.message);
                } finally {
                    if (fs.existsSync(pcmPath)) fs.unlinkSync(pcmPath);
                }
            });
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
