import { Component, OnInit, AfterViewInit, Inject } from '@angular/core';
import { VideoService } from '../services/video.service';
import { Video } from '../models/video';
import { VidService} from '../services/vid.service';
import { Vlogvideo } from '../models/vlogvideo';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore} from 'angularfire2/firestore';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
declare var $:any;

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.css']
})


export class VideoListComponent implements OnInit,AfterViewInit {
  
 
  drip :string; 
  vlogvids:Vlogvideo[];
  categoriaToFilter:string;
  source:string;
  val:any;
  public data:any=[]
  constructor( @Inject(LOCAL_STORAGE) private storage: WebStorageService,public afs:AngularFirestore, private videoService:VideoService, private vid: VidService,public route:ActivatedRoute ) {
     window.scroll(0,0);
}

  ngOnInit() {
    this.vid.getVid().subscribe(currentSource =>{ this.source = currentSource});
    console.log(this.source);
    
   this.categoriaToFilter=this.vid.getFromLocal('key');
   this.videoService.filterBy(this.categoriaToFilter).subscribe( vlogvids =>{
      this.vlogvids = vlogvids;
     
     
  });
   let id = this.route.snapshot.paramMap.get('id');
   this.val=id;

   $(document).ready(function () {

    var key = 'AIzaSyAbflIELpbJC68vWot66KMN7J52n0BM1QE';
    var playlistId = 'UUIQg0FHxHYInjGQvzVf113g';
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var options = {
        part: 'snippet',
        key: key,
        maxResults: 20,
        playlistId: playlistId
    }

    loadVids();

    function loadVids() {
        $.getJSON(URL, options, function (data) {
            var id = data.items[0].snippet.resourceId.videoId;
            mainVid(id);
            resultsLoop(data);
        });
    }

    function mainVid(id) {
        $('#video').html(`
					<iframe width="560" height="315" src="https://www.youtube.com/embed/${id}?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
    }

		
    function resultsLoop(data) {

        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid = item.snippet.resourceId.videoId;


            $('#mm').append(`
						
              <article class="media border p-3" data-key="${vid}">
              <img src="${thumb}" alt="" style="height: 70px;
              border-radius: 4px;" >
              <div class="media-body">
              <h4>${title}</h4>
              <p>${desc}</p>
             </div>
             </article>
						`);
        });
    }

		// CLICK EVENT
    $('#mm').on('click', 'article', function () {
        var id = $(this).attr('data-key');
        mainVid(id);
    });


});
  }
  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }
  setDrip(vlogvid) {
    this.drip=vlogvid.url;
  }
  saveInLocal(key, val): void {
    console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
   }
   getFromLocal(key): void {
    console.log('recieved= key:' + key);
    this.data[key]= this.storage.get(key);
    console.log(this.data);
   }
   changeVid(vlogvid){
     this.drip=vlogvid.url;
  }
  refresh(): void {
    window.location.reload();
}
playVid(vlogvid){
  this.vid.changeVid(vlogvid.url);
  this.vid.saveInLocal('key',vlogvid.vlogerId);
}
  
}
