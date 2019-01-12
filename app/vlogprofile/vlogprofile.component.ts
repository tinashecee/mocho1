import { Component, OnInit, Inject } from '@angular/core';
import { VidService } from '../services/vid.service';
import { VideoService } from '../services/video.service';
import { Vlogvideo } from '../models/vlogvideo';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore} from 'angularfire2/firestore';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
declare var $:any;
declare var varr:string;
declare var vid1:any;
@Component({
  selector: 'app-vlogprofile',
  templateUrl: './vlogprofile.component.html',
  styleUrls: ['./vlogprofile.component.css']
})
export class VlogprofileComponent implements OnInit {
  categoriaToFilter:string; 
  val:any;
  name:string;
  drip :string; 
  vlogvids:Vlogvideo[];
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private vid:VidService,private videoService:VideoService ,public route:ActivatedRoute) { 
    window.scroll(0,0);
  }

  ngOnInit() {
    
  let id = this.route.snapshot.paramMap.get('id');
  this.categoriaToFilter=id;
  var varr=id;
   this.name=this.vid.getFromLocal('key1'); 
  $(document).ready(function () {
    var key = 'AIzaSyAbflIELpbJC68vWot66KMN7J52n0BM1QE';
    var playlistId = varr;
    var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';


    var options = {
        part: 'snippet',
        key: key,
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
        $('#earl').html(`
					<iframe id="playerid"  width="100%" height="250" src="https://www.youtube.com/embed/${id}?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
				`);
    }

		
    function resultsLoop(data) {

        $.each(data.items, function (i, item) {

            var thumb = item.snippet.thumbnails.medium.url;
            var title = item.snippet.title;
            var desc = item.snippet.description.substring(0, 100);
            var vid1 = item.snippet.resourceId.videoId;


            $('#ln').append(`
						<br/>  
                      <ng-container data-key="${vid1}" class="col-md-4 col-sm-6 col-xs-12"  >
                      <!--Peverelist - Roll With The Punches-->
                        <div   class="card" style="border-top:2px solid orange;border-bottom:2px solid orange;">
                          <img class="card-img-top" src="${thumb}" alt="Card image" style="width:100%">
                          <div class="card-body">
                            <p class="card-text">${title}</p>
                       </div>
                        </div>
                        <br/>
                      </ng-container>
              
						`);
        });
    }
    function setDrip(vlo:string) {
      console.log('look at this'+vlo);
    }
		// CLICK EVENT
$('#ln').on('click', 'ng-container', function () {
 var idd = $(this).attr('data-key');
     mainVid(idd);
   
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
  setDrip(vlo:string) {
    console.log('look at this'+vlo);
  }

}
