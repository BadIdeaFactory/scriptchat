import React from 'react'
import './Script.css'

export default class Script extends React.Component {
  render () {
    return (
      <div id="script" className="us-letter dpi72">
        <div className="page title-page">
          <h1>How to use Screenwriter</h1>
          <p className="credit">written by</p>
          <p className="authors">Chris</p>
          <p className="notes">INITIAL DRAFT
            <br />includes post-production dialogue
            <br />and omitted scenes
          </p>
          <p className="copyright">(c) 2013 Some Movie Studio</p>
        </div>
        <div className="page">
          <p><span className="bold">FADE IN:</span></p>
          <h3>EXT. INTRODUCTION - DAY</h3>
          <p>The following is an introduction on how to use screenwriter. It is a simple app to allow for the generation of .fountain files (screenplay documents).</p>
          <p>For more documentation, and an overview of syntax, please check out http://fountain.io</p>
          <p>An excerpt has been posted below as an example of what can be done.</p>
          <h3>INT. SCREENWRITER - DAY</h3>
          <p>Screenwriter allows one to visualize their script as they are writing it. The product is still in beta, but the ability to export the document to PDF and Final Draft is coming shortly.</p>
          <p>Autocompletion is in its early stages as well. As you type characters names, they should appear in the top right hand corner. Hit enter to insert into the document, or keep typing to further narrow down the possibilities.</p>
          <p>When you are done, hit save. To begin editing again at a later time, simply drag the file from your desktop onto the editor.</p>
          <p>Enjoy.</p>
          <p>Now for a sample script:</p>
          <p>-</p>
          <h3>EXT. BRICK'S PATIO - DAY</h3>
          <p>A gorgeous day.  The sun is shining.  But BRICK BRADDOCK, retired police detective, is sitting quietly, contemplating -- something.</p>
          <p>The SCREEN DOOR slides open and DICK STEEL, his former partner and fellow retiree, emerges with two cold beers.</p>
          <div className="dialogue">
            <h4>STEEL</h4>
            <p>Beer's ready!</p>
          </div>
          <div className="dialogue">
            <h4>BRICK</h4>
            <p>Are they cold?</p>
          </div>
          <div className="dialogue">
            <h4>STEEL</h4>
            <p>Does a bear crap in the woods?</p>
          </div>
          <p>Steel sits.  They laugh at the dumb joke.</p>
          <div className="dialogue">
            <h4>STEEL</h4>
            <p className="parenthetical">(beer raised)</p>
            <p>To retirement.</p>
          </div>
          <div className="dialogue">
            <h4>BRICK</h4>
            <p>To retirement.</p>
          </div>
          <p>They drink long and well from the beers.</p>
          <p>And then there's a long beat.
          <br />Longer than is funny.
          <br />Long enough to be depressing.</p>
          <p>The men look at each other.</p>
          <div className="dual-dialogue">
            <div className="dialogue left">
              <h4>STEEL</h4>
              <p>Screw retirement.</p>
            </div>
            <div className="dialogue right">
              <h4>BRICK</h4>
              <p>Screw retirement.</p>
            </div>
          </div>
          <h2>SMASH CUT TO:</h2>
          <h3>INT. TRAILER HOME - DAY</h3>
          <p>This is the home of THE BOY BAND, AKA DAN and JACK.  They too are drinking beer, and counting the take from their last smash-and-grab.  Money, drugs, and ridiculous props are strewn about the table.</p>
          <div className="dialogue">
            <h4>JACK</h4>
            <p className="parenthetical">(in Vietnamese, subtitled)</p>
            <p><span className="italic">Did you know Brick and Steel are retired?</span></p>
          </div>
          <p>DAN</p>
          <p>Then let's retire them.
          <br /><span className="underline">Permanently</span>.</p>
          <p>Jack begins to argue vociferously in Vietnamese (?), But mercifully we...</p>
          <h2>CUT TO:</h2>
          <h3>EXT. BRICK'S POOL - DAY</h3>
          <p>Steel, in the middle of a heated phone call:</p>
          <div className="dialogue">
            <h4>STEEL</h4>
            <p>They're coming out of the woodwork!<br /></p>
            <p className="parenthetical">(pause)</p>
            <p>No, everybody we've put away!<br /></p>
            <p className="parenthetical">(pause)</p>
            <p>Point Blank Sniper?</p>
          </div>
          <h3>SNIPER SCOPE POV</h3>
          <p>From what seems like only INCHES AWAY.  <span className="underline">Steel's face FILLS the <span className="italic">Leupold Mark 4</span> scope</span>.</p>
          <div className="dialogue">
            <h4>STEEL</h4>
            <p>The man's a myth!</p>
          </div>
          <p>Steel turns and looks straight into the cross-hairs.</p>
          <div className="dialogue">
            <h4>STEEL</h4>
            <p className="parenthetical">(oh crap)</p>
            <p>Hello...</p>
          </div>
          <h2>CUT TO:</h2>
          <h3>OPENING TITLES</h3>
          <p className="centered">BRICK BRADDOCK<br /> &amp; DICK STEEL IN</p>
          <p className="centered">BRICK &amp; STEEL<br /> FULL RETIRED</p>
          <h2>SMASH CUT TO:</h2>
          <h3>EXT. WOODEN SHACK - DAY</h3>
          <p>COGNITO, the criminal mastermind, is SLAMMED against the wall.</p>
          <div className="dialogue">
            <h4>COGNITO</h4>
            <p>Woah woah woah, Brick and Steel!</p>
          </div>
          <p>Sure enough, it's Brick and Steel, roughing up their favorite usual suspect.</p>
          <div className="dialogue">
            <h4>COGNITO</h4>
            <p>What is it you want with me, DICK?</p>
          </div>
          <p>Steel SMACKS him.</p>
          <div className="dialogue">
            <h4>STEEL</h4>
            <p>Who's coming after us?</p>
          </div>
          <div className="dialogue">
            <h4>COGNITO</h4>
            <p>Everyone's coming after you mate!  Scorpio, The Boy Band, Sparrow, Point Blank Sniper...</p>
          </div>
          <p>As he rattles off the long list, Brick and Steel share a look.  This is going to be BAD.</p>
          <h2>CUT TO:</h2>
          <h3>INT. GARAGE - DAY</h3>
          <p>BRICK and STEEL get into Mom's PORSCHE, Steel at the wheel.  They pause for a beat, the gravity of the situation catching up with them.</p>
          <div className="dialogue">
            <h4>BRICK</h4>
            <p>This is everybody we've ever put away.</p>
          </div>
          <div className="dialogue">
            <h4>STEEL</h4>
            <p className="parenthetical">(starting the engine)</p>
            <p>So much for retirement!</p>
          </div>
          <p>They speed off.  To destiny!</p>
          <h2>CUT TO:</h2>
          <h3>EXT. PALATIAL MANSION - DAY</h3>
          <p>An EXTREMELY HANDSOME MAN drinks a beer.  Shirtless, unfortunately.</p>
          <p>His minion approaches offscreen:</p>
          <div className="dialogue">
            <h4>MINION</h4>
            <p>We found Brick and Steel!</p>
          </div>
          <div className="dialogue">
            <h4>HANDSOME MAN</h4>
            <p>I want them dead.  DEAD!</p>
          </div>
          <p>Beer flies.</p>
          <h2>BURN TO PINK.</h2>
          <p className="centered">THE END</p>
        </div>
      </div>
    )
  }
}
