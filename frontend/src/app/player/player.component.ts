import {Component, OnInit, ViewChild} from '@angular/core';

import SC from 'soundcloud';


@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  clientId: String = '2f98992c40b8edf17423d93bda2e04ab';

  @ViewChild('audioPlayer') myAudio: any;

  player: SC;

  ngOnInit() {
    SC.initialize({
      client_id: this.clientId,
      redirect_uri: 'http://example.com/callback'
    });

    console.log(' Init! ');

    SC.get('playlists/209262931').then( playlist =>
      console.log('Latest track: ' + playlist.tracks[0].title)
    );

    SC.oEmbed('http://soundcloud.com/forss/flickermood', this.player);

    // this.player.play()

  }

  toggleAudio(event: any) {

    console.log(' hit! ' + this.player.play());

  }
}
