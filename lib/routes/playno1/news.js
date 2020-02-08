const got = require('@/utils/got');
const cheerio = require('cheerio');
const url = require('url');

module.exports = async (ctx) => {

    const response = await got({
        method: 'get',
        url: 'http://www.playno1.com/portal.php?mod=list&catid=78',
        headers: {
            Referer: 'http://www.playno1.com/',
            cookie: 'playno1=playno1Cookie',
        },
    });
    const data = response.data;

    const $ = cheerio.load(data);
    const list = $('.fire_float');

    ctx.state.data = {
        title: 'playno1',
        link: 'http://www.playno1.com',
        description: 'playno1',
        item: list
            .map((i, item) => ({
                title: $(item)
                    .find('h3 > a')
                    .text()
                    .trim(),
                pubDate: $(item).find('.fire_dv .fire_left').text().trim(),
                description: $(item).find('.fire_p').text().trim(),
                guid: url.resolve(
                    'http://www.playno1.com/',
                    $(item)
                        .find('h3 > a')
                        .attr('href')
                ),
                link: url.resolve(
                    'http://www.playno1.com/',
                    $(item)
                        .find('h3 > a')
                        .attr('href')
                )
            }))
            .get(),
    };
};
