
关于instagram 的 api 用法
应该用：
https://instagram.com/developer/endpoints/tags/#get_tags_media_recent


简单的说 会返还 一个 
{
	"data": [  
	{
		"type" : "image",
		"users_in_photo":[],
		"filter": "Earlybird",
		"tag": ["snow"],
		"comments": {

		}
		
		"caption": { 

			},
		
		"likes": {



		},
		"link":{


		},

		"user":{


		},

		
		 "created_time":  "1296703536",


		 "images" : {


		 },

		"id": "22699663",
        
        "location": null
	}
	  ]

}


底下是一个整体的




{
    "data": [



    {
        "type": "image",
        "users_in_photo": [],
        "filter": "Earlybird",
        "tags": ["snow"],

        "comments": {
            "data": [{
                "created_time": "1296703540",
                "text": "Snow",
                "from": {
                    "username": "emohatch",
                    "username": "Dave",
                    "id": "1242695"
                },
                "id": "26589964"
            },
            {
                "created_time": "1296707889",
                "text": "#snow",
                "from": {
                    "username": "emohatch",
                    "username": "Emo Hatch",
                    "id": "1242695"
                },
                "id": "26609649"
            }],
            "count": 3
        }

        "caption": {
            "created_time": "1296703540",
            "text": "#Snow",
            "from": {
                "username": "emohatch",
                "id": "1242695"
            },
            "id": "26589964"
        },



        "likes": {
            "count": 1,
            "data": [{
                "username": "mikeyk",
                "full_name": "Mike Krieger",
                "id": "4",
                "profile_picture": "http://distillery.s3.amazonaws.com/profiles/profile_1242695_75sq_1293915800.jpg"
            }]
        },        



        "link": "http://instagr.am/p/BWl6P/",

        "user": {
            "username": "emohatch",
            "profile_picture": "http://distillery.s3.amazonaws.com/profiles/profile_1242695_75sq_1293915800.jpg",
            "id": "1242695",
            "full_name": "Dave"
        },

        "created_time": "1296703536",


        "images": {
            "low_resolution": {
                "url": "http://distillery.s3.amazonaws.com/media/2011/02/02/f9443f3443484c40b4792fa7c76214d5_6.jpg",
                "width": 306,
                "height": 306
            },
            "thumbnail": {
                "url": "http://distillery.s3.amazonaws.com/media/2011/02/02/f9443f3443484c40b4792fa7c76214d5_5.jpg",
                "width": 150,
                "height": 150
            },
            "standard_resolution": {
                "url": "http://distillery.s3.amazonaws.com/media/2011/02/02/f9443f3443484c40b4792fa7c76214d5_7.jpg",
                "width": 612,
                "height": 612
            }
        },


        "id": "22699663",
        "location": null


    },




    {
        "type": "video",
        "videos": {
            "low_resolution": {
                "url": "http://distilleryvesper9-13.ak.instagram.com/090d06dad9cd11e2aa0912313817975d_102.mp4",
                "width": 480,
                "height": 480
            },
            "standard_resolution": {
                "url": "http://distilleryvesper9-13.ak.instagram.com/090d06dad9cd11e2aa0912313817975d_101.mp4",
                "width": 640,
                "height": 640
            },
        "users_in_photo": null,
        "filter": "Vesper",
        "tags": ["snow"],
        "comments": {
            "data": [{
                "created_time": "1279332030",
                "text": "Love the sign here",
                "from": {
                    "username": "mikeyk",
                    "full_name": "Mikey Krieger",
                    "id": "4",
                    "profile_picture": "http://distillery.s3.amazonaws.com/profiles/profile_1242695_75sq_1293915800.jpg"
                },
                "id": "8"
            },
            {
                "created_time": "1279341004",
                "text": "Chilako taco",
                "from": {
                    "username": "kevin",
                    "full_name": "Kevin S",
                    "id": "3",
                    "profile_picture": "..."
                },
                "id": "3"
            }],
            "count": 2
        },
        "caption": null,
        "likes": {
            "count": 1,
            "data": [{
                "username": "mikeyk",
                "full_name": "Mikeyk",
                "id": "4",
                "profile_picture": "..."
            }]
        },
        "link": "http://instagr.am/p/D/",
        "user": {
            "username": "kevin",
            "full_name": "Kevin S",
            "profile_picture": "...",
            "id": "3"
        },
        "created_time": "1279340983",
        "images": {
            "low_resolution": {
                "url": "http://distilleryimage2.ak.instagram.com/11f75f1cd9cc11e2a0fd22000aa8039a_6.jpg",
                "width": 306,
                "height": 306
            },
            "thumbnail": {
                "url": "http://distilleryimage2.ak.instagram.com/11f75f1cd9cc11e2a0fd22000aa8039a_5.jpg",
                "width": 150,
                "height": 150
            },
            "standard_resolution": {
                "url": "http://distilleryimage2.ak.instagram.com/11f75f1cd9cc11e2a0fd22000aa8039a_7.jpg",
                "width": 612,
                "height": 612
            }
        },
        "id": "3",
        "location": null
    },
    ...]
}



然后在db.js 里面用这个方法：

https://github.com/totemstech/instagram-node

ig.tag_media_recent('tag', [options,] function(err, medias, pagination, remaining, limit) {});

ig.tag_search('query', function(err, result, remaining, limit) {});


return 的medias就是我们要的东西








