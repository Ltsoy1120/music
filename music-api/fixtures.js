const mongoose = require("mongoose");
const { nanoid } = require("nanoid");
const config = require("./app/config");
const Album = require("./app/models/Album");
const Artist = require("./app/models/Artist");
const Track = require("./app/models/Track");
const User = require("./app/models/User");
const TrackHistory = require("./app/models/TrackHistory");

mongoose.connect(config.db.url+'/'+config.db.name, {useNewUrlParser:true})
const db = mongoose.connection
db.once('open',async()=> {
    try{
        await db.dropCollection('artists')
        await db.dropCollection('albums')
        await db.dropCollection('tracks')
        await db.dropCollection('trackhistories')
        await db.dropCollection('users')
    }catch(e){
        console.log('Collection were not present, skipping drop...')
    }
    const [user, admin] = await User.create({
        username: 'user',
        password: '12345',
        displayName: 'Maria',
        avatarImage: 'Ava_girl.jpeg',
        role: 'user',
        token: nanoid()
    },{
        username: 'admin',
        password: '12345',
        displayName: 'Alex',
        avatarImage: 'Ava_man.jpeg',
        role: 'admin',
        token: nanoid()
    })
    const [artSamCooke, artFrankSinatra] = await Artist.create({
        user: user,
        title: 'Sam Cooke', 
        published: false,
        image: 'SamCooke.jpeg',
        information: 'The vocalist who stood at the origins of soul music. According to Allmusic, Sam Cooke is "the most important singer in the history of soul music - its inventor and the most popular and adored performer, not only among blacks, but also among whites".'
    },{
        user: user,
        title: 'Frank Sinatra', 
        published: false,
        image: 'FrankSinatra.jpeg',
        information: 'American film actor, film director, producer, showman, singer. He became a Grammy Award winner eleven times. He was famous for his romantic style of singing songs and “velvet” timbre of his voice. In the 20th century, Sinatra has become a legend not only of the musical world, but of every aspect of American culture.'
    })
    const [albYouBelongtoMe, albSummertime, albLongLongAgo, albFromBottomTop, albDeepInDream] = await Album.create({
        user: user,
        title: 'You Belong to Me',
        artist: artSamCooke,
        yearOfIssue: 1964,
        coverImage: 'YouBelongtoMe.jpeg',
        published: false
    },{
        user: user,
        title: 'Summertime',
        artist: artSamCooke,
        yearOfIssue: 1959,
        coverImage: 'Summertime.jpeg',
        published: false
    },{
        user: user,
        title: 'Long, Long Ago',
        artist: artSamCooke,
        yearOfIssue: 1957,
        coverImage: 'LongLongAgo.jpeg',
        published: false
    },{
        user: user,
        title: 'From the Bottom to the Top',
        artist: artFrankSinatra,
        yearOfIssue: 2000,
        coverImage: 'FromtheBottomtotheTop.jpeg',
        published: false
    },{
        user: user,
        title: 'Deep In a Dream',
        artist: artFrankSinatra,
        yearOfIssue: 2001,
        coverImage: 'DeepInaDream.jpeg',
        published: false
    })
    const [trImJust, trCannadian, trWonderful, trSummertime, 
        trOldMan, trWhenIFall, trLong, trNotStranger, trAllofMe, trFoggyDay, 
        trWorriesMe, trDeepDream ] = await Track.create({
        user: user,
        title:'I´m Just a Country Boy',
        artist: artSamCooke,
        album: albYouBelongtoMe,
        duration:'4:10',
        number:1,
        published: false
    },{
        user: user,
        title: 'Cannadian Sunset',
        artist: artSamCooke,
        album: albYouBelongtoMe,
        duration: '2:52',
        number: 2,
        published: false
    },{
        user: user,
        title: 'Wonderful World',
        artist: artSamCooke,
        album: albYouBelongtoMe,
        duration: '2:07',
        number: 3,
        published: false
    },{
        user: user,
        title: 'Summertime',
        artist: artSamCooke,
        album: albSummertime,
        duration: '2:27',
        number: 1,
        published: false
    },{
        user: user,
        title: 'Old Man River',
        artist: artSamCooke,
        album: albSummertime,
        duration: '2:34',
        number: 2,
        published: false
    },{
        user: user,
        title: 'When I Fall In Love',
        artist: artSamCooke,
        album: albSummertime,
        duration: '2:46',
        number: 3,
        published: false
    },{
        user: user,
        title: 'Long, Long Ago',
        artist: artSamCooke,
        album: albLongLongAgo,
        duration: '2:51',
        number: 1,
        published: false
    },{
        user: user,
        title: 'Not as a Stranger',
        artist: artFrankSinatra,
        album: albFromBottomTop,
        duration: '2:46',
        number: 1,
        published: false
    },{
        user: user,
        title: 'All of Me',
        artist: artFrankSinatra,
        album: albFromBottomTop,
        duration: '2:07',
        number: 2,
        published: false
    },{
        user: user,
        title: 'A Foggy Day',
        artist: artFrankSinatra,
        album: albFromBottomTop,
        duration: '2:07',
        number: 3,
        published: false
    },{
        user: user,
        title: 'It Worries Me',
        artist: artFrankSinatra,
        album: albDeepInDream,
        duration: '2:35',
        number: 1,
        published: false
    },{
        user: user,
        title: 'Deep In a Dream',
        artist: artFrankSinatra,
        album: albDeepInDream,
        duration: '2:25',
        number: 2,
        published: false
    })
    await TrackHistory.create({
        user: user,
        track: trImJust,
        datetime: 'Tue Jan 19 2021 15:42:59'
    },{
        user: user,
        track: trCannadian,
        datetime: 'Tue Jan 20 2021 15:42:00'
    },{
        user: user,
        track: trNotStranger,
        datetime: 'Tue Jan 19 2021 12:40:00'
    },{
        user: user,
        track: trSummertime,
        datetime: 'Tue Jan 19 2021 9:20:00'
    },{
        user: user,
        track: trDeepDream,
        datetime: 'Tue Jan 19 2021 16:30:00'
    },{
        user: admin,
        track: trWonderful,
        datetime: 'Tue Jan 19 2021 17:50:35'
    },{
        user: admin,
        track: trOldMan,
        datetime: 'Tue Jan 19 2021 11:29:00'
    },{
        user: admin,
        track: trWhenIFall,
        datetime: 'Tue Jan 18 2021 12:40:00'
    },{
        user: admin,
        track: trLong,
        datetime: 'Tue Jan 20 2021 18:10:50'
    },{
        user: admin,
        track: trAllofMe,
        datetime: 'Tue Jan 20 2021 10:15:23'
    },{
        user: admin,
        track: trFoggyDay,
        datetime: 'Tue Jan 18 2021 13:38:24'
    },{
        user: admin,
        track: trWorriesMe,
        datetime: 'Tue Jan 19 2021 19:20:27'
    },{
        user: admin,
        track: trImJust,
        datetime: 'Tue Jan 20 2021 21:54:32'
    })
    await db.close()
})