const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const BANKS = {
    '970422': 'MBBank',
    '970436': 'Vietcombank',
    '970415': 'VietinBank',
    '970418': 'BIDV',
    '970405': 'Agribank',
    '970448': 'OCB',
    '970407': 'Techcombank',
    '970416': 'ACB',
    '970432': 'VPBank',
    '970423': 'TPBank',
    '970403': 'Sacombank',
    '970437': 'HDBank',
    '970454': 'VietCapitalBank',
    '970429': 'SCB',
    '970441': 'VIB',
    '970443': 'SHB',
    '970431': 'Eximbank',
    '970426': 'MSB',
    '971005': 'ViettelMoney',
    '971011': 'VNPTMoney',
    '970400': 'SaigonBank',
    '970412': 'PVcomBank',
    '970414': 'Oceanbank',
    '970424': 'ShinhanBank',
    '970425': 'ABBANK'
};

module.exports = {
    data: new SlashCommandBuilder()
        .setName('qrcode')
        .setDescription('Tạo mã QR cho ngân hàng sử dụng VietQR')
        .addIntegerOption(option =>
            option.setName('amount')
                .setDescription('Số tiền (VND)')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('bank')
                .setDescription('Mã ngân hàng (Mặc định: OCB)')
                .setRequired(false)
                .addChoices(
                    { name: 'MBBank', value: '970422' },
                    { name: 'Vietcombank', value: '970436' },
                    { name: 'VietinBank', value: '970415' },
                    { name: 'BIDV', value: '970418' },
                    { name: 'Agribank', value: '970405' },
                    { name: 'OCB', value: '970448' },
                    { name: 'Techcombank', value: '970407' },
                    { name: 'ACB', value: '970416' },
                    { name: 'VPBank', value: '970432' },
                    { name: 'TPBank', value: '970423' },
                    { name: 'Sacombank', value: '970403' },
                    { name: 'HDBank', value: '970437' },
                    { name: 'VietCapitalBank', value: '970454' },
                    { name: 'SCB', value: '970429' },
                    { name: 'VIB', value: '970441' },
                    { name: 'SHB', value: '970443' },
                    { name: 'Eximbank', value: '970431' },
                    { name: 'MSB', value: '970426' },
                    { name: 'ViettelMoney', value: '971005' },
                    { name: 'VNPTMoney', value: '971011' },
                    { name: 'SaigonBank', value: '970400' },
                    { name: 'PVcomBank', value: '970412' },
                    { name: 'Oceanbank', value: '970414' },
                    { name: 'ShinhanBank', value: '970424' },
                    { name: 'ABBANK', value: '970425' }
                ))
        .addStringOption(option =>
            option.setName('account')
                .setDescription('Số tài khoản ngân hàng (Mặc định: 6666156156)')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('accountname')
                .setDescription('Tên tài khoản ngân hàng (Mặc định: HO DUC DAT)')
                .setRequired(false))
        .addStringOption(option =>
            option.setName('memo')
                .setDescription('Ghi chú (Mặc định: UNG HO E DAT)')
                .setRequired(false)),
    async execute(interaction) {
        const bankCode = interaction.options.getString('bank') || '970448'; // Default OCB
        const account = interaction.options.getString('account') || '0988006094';
        const accountName = (interaction.options.getString('accountname') || 'TRAN VAN QUY').toUpperCase();
        const amount = interaction.options.getInteger('amount');
        const memo = interaction.options.getString('memo') || 'legitvn';

        const bankName = BANKS[bankCode] || bankCode;
        const qrUrl = `https://img.vietqr.io/image/${bankCode}-${account}-compact.png?amount=${amount}&addInfo=${encodeURIComponent(memo)}&accountName=${encodeURIComponent(accountName)}`;

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setTitle('💳 THÔNG TIN CHUYỂN KHOẢN')
            .setDescription(`Vui lòng quét mã QR bên dưới để thanh toán nhanh chóng và chính xác.`)
            .addFields(
                { name: '🏦 Ngân hàng', value: `**${bankName}**`, inline: true },
                { name: '👤 Chủ tài khoản', value: `**${accountName}**`, inline: true },
                { name: '💳 Số tài khoản', value: `\`\`\`${account}\`\`\``, inline: false },
                { name: '💰 Số tiền', value: `\`\`\`${amount.toLocaleString('vi-VN')} VND\`\`\``, inline: true },
                { name: '📝 Nội dung', value: `\`\`\`${memo}\`\`\``, inline: true }
            )
            .setImage(qrUrl)
            .setThumbnail('https://vietqr.net/img/logo.png')
            .setFooter({ text: 'Powered by VietQR • Quét mã để thanh toán', iconURL: 'https://vietqr.net/img/logo.png' })
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
