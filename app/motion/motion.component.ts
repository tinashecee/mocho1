import { Component, OnInit } from '@angular/core';
import { Video } from '../models/video';
import {NgbTabsetConfig} from '@ng-bootstrap/ng-bootstrap';
import { VidService } from '../services/vid.service';
import { VideoService } from '../services/video.service';
import { Router, ActivatedRoute} from '@angular/router';
import { Video1 } from '../models/video1';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Vloger} from '../models/Vloger';
import { Vlogvideo} from '../models/Vlogvideo';
import { Observable } from '../../../node_modules/rxjs';

declare var $:any;
declare var varr:string;
declare var vid1:any;
@Component({
  selector: 'app-motion',
  templateUrl: './motion.component.html',
  styleUrls: ['./motion.component.css'],
  providers: [NgbTabsetConfig]
})
export class MotionComponent implements OnInit {
  vlogersCollection: AngularFirestoreCollection<Vloger>;
  vlogers$:Observable<Vloger[]>;
    vlogvideo: Vlogvideo ={
      id:'',
      playlistId:''
    }
     drip :string; 
    currentJustify = 'start';
  videos$:Video1[];
    varrr:string;
    constructor(config: NgbTabsetConfig,public afs:AngularFirestore,private videoService:VideoService ,private vid:VidService,private router:Router,private route:ActivatedRoute) { 
      window.scroll(0,0);
      config.justify = 'center';
    config.type = 'pills';
       
       this.vlogersCollection = this.afs.collection('vlogers');
      this.vlogers$ = this.vlogersCollection.valueChanges();
      
    }
   
    ngOnInit() {
      this.videoService.getVideos().subscribe( videos =>{
        this.vlogvideo = videos;
        this.varrr=this.vlogvideo.playlistId;
        var varr=this.varrr;
         $(document).ready(function () {
          var key = 'AIzaSyAbflIELpbJC68vWot66KMN7J52n0BM1QE';
          var URL = 'https://www.googleapis.com/youtube/v3/playlistItems';
          var playlistId = varr;
      
          var options = {
              part: 'snippet',
              key: key,
              playlistId: playlistId
    
          }
      
          loadVids();
      
          function loadVids() {
              $.getJSON(URL, options, function (data) {
                  var id = data.items[0].snippet.resourceId.videoId;
                
                  resultsLoop(data);
              });
          }
      
          //function mainVid(id) {
          //    $('#earl').html(`
          //      <iframe id="playerid"  width="100%" height="250" src="https://www.youtube.com/embed/${id}?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          //    `);
          //}
      
          
          function resultsLoop(data) {
            
              $.each(data.items, function (i, item) {
      
                  var thumb = item.snippet.thumbnails.medium.url;
                  var title = item.snippet.title;
                  var desc = item.snippet.description.substring(0, 100);
                  var vid1 = item.snippet.resourceId.videoId;
      
      
                  $('#rar').append(`
                  <br/>  
                          <ng-container data-key1="${vid1}" class="col-md-4 col-sm-6 col-xs-12" >
                          <!--Peverelist - Roll With The Punches-->
                            <div class="card" style="border-top:2px solid orange;border-bottom:2px solid orange;">
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
         
          // CLICK EVENT
      //$('#ln').on('click', 'ng-container', function () {
       //var idd = $(this).attr('data-key1');
        // 
         
       //   });
         
      });
    });
       
     this.vlogvideo=this.vid.getVideoz();
    
    }
    ngAfterViewInit() {
      // Hack: Scrolls to top of Page after page view initialized
      let top = document.getElementById('top');
      if (top !== null) {
        top.scrollIntoView();
        top = null;
      }
    }
    setDrip(event, video) {
      this.drip=video.source;
    }
    loadProfile(vloger){
     this.vid.saveInLocal('key1',vloger.name);
    }
}
