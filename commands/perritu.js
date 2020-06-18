const yts = require('yt-search');

module.exports = {
	name: 'perritu',
    description: 'Hablar con perritu',
	async execute(client, message, args) {

		message.channel.send('Hola.');

		const targetsong = args.join(' ');

		const opts = {
			query: targetsong,
			pageStart: 1,
			pageEnd: 1
		}

		const x = await yts(opts);

		const videos = x.videos;

		const video = {
			title: videos[0].title,
			url: videos[0].url,
			autor: videos[0].author.name,
			img: videos[0].thumbnail
		};

		console.log(videos);

	}
};