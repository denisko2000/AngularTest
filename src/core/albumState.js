import module from '../module/module';
module.factory('aState', function () {
    return {
        albums:{},
        getState: function () {
            this.albums = localStorage.getItem('albums');
            if (this.albums === null) {
                this.albums = JSON.stringify(this.createState());
                localStorage.setItem('albums', this.albums);
            }
            this.albums=JSON.parse(this.albums)
            return this.albums;
        },
        createState: function () {
            return [
                {
                    name:'popular',
                    description:'This is popular songs mix',
                    movies:[
                        { name: 'Lil Baby - Woah', link: 'https://www.youtube.com/watch?v=iVVbokygD-A' }
                    ]
                },
                {
                    name:'popular',
                    description:'goood',
                    movies:[
                        { name: 'Lil Baby - Woah', link: 'https://www.youtube.com/watch?v=iVVbokygD-A' }
                    ]
                },
                {
                    name:'popular',
                    description:'goood',
                    movies:[
                        { name: 'Lil Baby - Woah', link: 'https://www.youtube.com/watch?v=iVVbokygD-A' }
                    ]
                }
            ]
        },
        setStateAlbumName:function(index,newName){
            this.albums[index].name=newName;
            localStorage.setItem('albums', JSON.stringify(this.albums));
        },
        setTotalStateAlbum:function(obj){
            localStorage.setItem('albums', JSON.stringify(obj));
        }
    }
});