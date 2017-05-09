import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';

import * as SC from 'soundcloud';
import {Track} from './shared/track.interface';
import {User} from './shared/user.interface';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {

  clientId: String = '2f98992c40b8edf17423d93bda2e04ab';

  trackID: Number = 284270994;

  trackTest: Track;
/*
    = {
   kind: 'track',
   id: 284270994,
 created_at: '2016/09/23 11:22:31 +0000',
 user_id: 244106754,
 duration: 240191,
 commentable: true,
 state: 'finished',
   original_content_size: 5781438,
   last_modified: Date('2016/11/02 07:38:33 +0000'),
   sharing: 'public',
   tag_list: '',
   permalink: 'mr-eazi-x-wizkid-really-wanna-know-ole-remix',
   streamable: true,
   embeddable_by: 'all',
   purchase_url: null,
   purchase_title: null,
   label_id: null,
   genre: '',
   title: 'Mr Eazi X Wizkid – Really Wanna Know (Ole Remix)',
   description: '',
   label_name: null,
   release: null,
   track_type: null,
   key_signature: null,
   isrc: null,
   video_url: null,
   bpm: null,
   release_year: null,
   release_month: null,
   release_day: null,
   original_format: 'mp3',
   license: 'all-rights-reserved',
   uri: new URL('https://api.soundcloud.com/tracks/284270994'),
   user: new User (
     id: 244106754,
     kind: 'user',
     permalink: 'ilite-entertainment',
     username: 'iLite Entertainment',
     last_modified: '2017/01/19 00:18:49 +0000',
     uri: new URL('https://api.soundcloud.com/users/244106754'),
     permalink_new URL: new URL('http://soundcloud.com/ilite-entertainment'),
     avatar_new URL: new URL('https://i1.sndcdn.com/avatars-000278981722-l65vfa-large.jpg')
   ),
   permalink_new URL: new new URL('https://soundcloud.com/ilite-entertainment/mr-eazi-x-wizkid-really-wanna-know-ole-remix')
   artwork_new URL: new URL('https://i1.sndcdn.com/artworks-000184613712-vbdz89-large.jpg'),
   stream_new URL: new URL('https://api.soundcloud.com/tracks/284270994/stream'),
   download_new URL: new URL('https://api.soundcloud.com/tracks/284270994/download'),
   playback_count: 3213,
   download_count: 10,
   favoritings_count: 41,
   reposts_count: 3,
   comment_count: 0,
   downloadable: true,
   waveform_new URL: new URL('https://w1.sndcdn.com/fskWP4WvN8Fv_m.png'),
   attachments_uri: new URL('https://api.soundcloud.com/tracks/284270994/attachments')
  }
*/

  @ViewChild('audioPlayer') myAudio: any;

  track: Track;

  currentPlayer: HTMLAudioElement;

  ngOnInit() {
    SC.initialize({
      client_id: this.clientId,
      redirect_uri: 'http://example.com/callback'
    });

    console.log(' Init! ');

    // const playlistP: Promise<Track[]> = SC.get('playlists/209262931');

    SC.get('playlists/209262931')
      .then( playlist => {
        const length = playlist.tracks.length
        console.log('Size: ' + length);
        this.track = playlist.tracks[ length - 10 ];
        console.log('Latest track: ' + this.track.id);
        console.log('Latest track: ' + this.track.uri);
        // this.trackID = this.track.id;
      })
      .catch((err) => {
        console.error(err.message); // something bad happened
      });

    // SC.oEmbed('http://soundcloud.com/forss/flickermood', this.player);

    // this.player.play()

    // const context = new ((<any>window).AudioContext || (<any>window).webkitAudioContext)();
    // const audio = new Audio();
      // `stream_url` you'd get from
      // requesting http://api.soundcloud.com/tracks/6981096.json
    // const  url = 'http://api.soundcloud.com/tracks/284270994/stream' + '?client_id=' + this.clientId;

    // const url = 'http://media.crave.fm:1935/vod/mp4:WhatIsThisThingCalledLove.mp4/manifest.mpd';

    // audio.src = url;
    // const source = context.createMediaElementSource(audio);
    // source.connect(context.destination);
    // source.mediaElement.play();

  }

  ngAfterViewInit() {
    SC.stream('tracks/' + this.trackID)
      .then( player => {
          this.currentPlayer = player;
          this.currentPlayer.play();
          this.currentPlayer.volume = 50;
        }
      )
      .catch((err) => {
        console.error(err.message); // something bad happened
      });
  }

  toggleAudio(event: any) {

    console.log(' hit! ' + this.currentPlayer.pause());

  }
}
