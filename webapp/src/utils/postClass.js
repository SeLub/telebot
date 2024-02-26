import { randomUUID } from 'crypto';
console.log(randomUUID());

class Post {
      constructor(text){
            this.id = randomUUID();
            this.text = text;
      }

      addPhoto(photo){
            'photo' in this ? this.photo.push(photo) : this.photo = [photo] ;
            return this;
      }
      deletePhoto(photo){
            'photo' in this ? this.photo = this.photo.filter( file => file !== photo ) : null ;
            return this;
      }
      deleteAllPhotos(){
            delete this.photo;
            return this;
      }
      addVideo(video){
            'video' in this ? this.video.push(video) : this.video = [video] ;
            return this;
      }
      deleteVideo(video){
            'video' in this ? this.video = this.video.filter( file => file !== video ) : null ;
            return this;
      }
      deleteAllVideos(){
            delete this.video;
            return this;
      }
      addDocument(document){
            'document' in this ? this.document.push(document) : this.document = [document] ;
            return this;
      }
      deleteDocument(document){
            'document' in this ? this.document = this.document.filter( file => file !== document ) : null ;
            return this;
      }
      deleteAllDocuments(){
            delete this.document;
            return this;
      }
      addAudio(audio){
            'audio' in this ? this.audio.push(audio) : this.audio = [audio] ;
            return this;
      }
      deleteAudio(audio){
            'audio' in this ? this.audio = this.audio.filter( file => file !== audio ) : null ;
            return this;
      }
      deleteAllAudios(){
            delete this.audio;
            return this;
      }
      addAnimation(animation){
            'animation' in this ? this.animation.push(animation) : this.animation = [animation] ;
            return this;
      }
      deleteAnimation(animation){
            'animation' in this ? this.animation = this.animation.filter( file => file !== animation ) : null ;
            return this;
      }
      deleteAllAnimations(){
            delete this.animation;
            return this;
      }
      build(){
            return this
      }
}

export default Post;