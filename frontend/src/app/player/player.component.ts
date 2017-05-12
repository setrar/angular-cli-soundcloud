import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';

import * as SC from 'soundcloud';
import {Track} from './shared/track.interface';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit, AfterViewInit {

  clientId: String = '2f98992c40b8edf17423d93bda2e04ab';

  trackID: Number = 284270994;

  @ViewChild('player') audio: HTMLAudioElement;

  @Input() src: String;

  constructor() {}

  ngOnInit() {

    SC.initialize({
      client_id: this.clientId,
      redirect_uri: 'http://example.com/callback'
    });

    console.log(' Init! ');

    this.displayTrackInformation();

  }

  ngAfterViewInit() {

    // Direct Access use straight URL
    // this.src = 'http://www.largesound.com/ashborytour/sound/AshboryBYU.mp3';

    this.streamTrackWithoutUsingAudioTag(false);

    this.loadAudioTagWithDirectURLCall();

  }

  /**
   * Directly calls an MP3 URL
   */
  loadAudioTagWithDirectURLCall() {

    const origin: Promise<Track> = SC.get('tracks/' + this.trackID);

    origin
      .then( sound => {

      this.src = sound.stream_url.toString() + '?client_id=' + this.clientId;

      })
      .catch( err  => {
        console.error('trackID:' + this.trackID + err.message); // something bad happened
      });

  }

  streamTrackWithoutUsingAudioTag(play: Boolean) {

    // Sound Cloud Stream
    const stream: Promise<any> = SC.stream('tracks/' + this.trackID);

    stream
      .then( player => {
        /*
         * rtmp comes before http,
         * to allow HTML5 audio feature
         * it needs to be reversed
         */
        if (player.options.protocols[0] === 'rtmp') {
          player.options.protocols = player.options.protocols.reverse();
        }

        this.audio = player;
        this.audio.volume = 0.5;
        this.audio.loop = true;
        this.audio.controls = true;
        if (play) {
          this.audio.play();
        }
      })
      .catch( err  => {
        console.error('trackID:' + this.trackID + err.message); // something bad happened
      });

  }


  displayTrackInformation() {

    const playlistP: Promise<any> = SC.get('playlists/209262931');

    playlistP
      .then( playlist => {
        const length = playlist.tracks.length;
        console.log('Size: ' + length);
        const track: Track = playlist.tracks[ length - 10 ];
        console.log('track ID: ' + track.id);
        console.log('URI: ' + track.uri);
        console.log('Title: ' + track.title);
      })
      .catch((err) => {
        console.error(err.message); // something bad happened
      });

  }

}
