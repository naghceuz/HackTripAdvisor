
关于instagram 的 api 用法
应该用：
https://instagram.com/developer/endpoints/tags/#get_tags_media_recent


简单的说 会返还 一个 




底下是一个整体的

[ { attribution: null,
    tags: [ 'hacktripadvisor' ],
    location: { latitude: 42.364701773, longitude: -71.086915014 },
    comments: { count: 0, data: [] },
    filter: 'Hudson',
    created_time: '1425700382',
    link: 'https://instagram.com/p/z6X6a4ExSm/',
    likes: { count: 1, data: [Object] },
    images: 
     { low_resolution: [Object],
       thumbnail: [Object],
       standard_resolution: [Object] },
    users_in_photo: [],
    caption: 
     { created_time: '1425700382',
       text: 'Hack到时间的尽头 #hacktripadvisor',
       from: [Object],
       id: '935165042525148277' },
    type: 'image',
    id: '935165042290267302_559886220',
    user: 
     { username: 'owenzgc',
       profile_picture: 'https://igcdn-photos-c-a.akamaihd.net/hphotos-ak-xap1/t51.2885-19/10354500_649494401802362_1198806921_a.jpg',
       id: '559886220',
       full_name: 'Designer' } },




       
  { attribution: null,
    tags: [ 'hacktripadvisor', 'gotripadvisor' ],
    location: null,
    comments: { count: 0, data: [] },
    filter: 'Normal',
    created_time: '1425693862',
    link: 'https://instagram.com/p/z6LeoVQbez/',
    likes: { count: 5, data: [Object] },
    images: 
     { low_resolution: [Object],
       thumbnail: [Object],
       standard_resolution: [Object] },
    users_in_photo: [],
    caption: 
     { created_time: '1425693862',
       text: '@ashlenef87 as Ollie #GoTripAdvisor #HackTripAdvisor',
       from: [Object],
       id: '935110356269905479' },
    type: 'image',
    id: '935110356035024819_1621449204',
    user: 
     { username: 'shannonlafosse',
       profile_picture: 'https://igcdn-photos-d-a.akamaihd.net/hphotos-ak-xfa1/t51.2885-19/10852724_900707126614963_1912469906_a.jpg',
       id: '1621449204',
       full_name: 'Shannon LaFosse' } } ]










然后在db.js 里面用这个方法：

https://github.com/totemstech/instagram-node

ig.tag_media_recent('tag', [  [10], [20] ] function(err, medias, pagination, remaining, limit) {});

ig.tag_search('query', function(err, result, remaining, limit) {});


return 的medias就是我们要的东西

ig.tag_media_recent('tag', [options,] function(err, medias, pagination, remaining, limit) {});








