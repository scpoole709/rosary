import { Page } from '../../utilities/page';
import Beginning from './Beginning.json';
import Mysteries from './Mysteries.json';
import ApostlesCreed from './ApostlesCreed.json';
import GloryBe from './GloryBe.json';
import HailMary from './HailMary.json';
import HailHolyQueen from './HailHolyQueen.json';
import OurFather from './OurFather.json';
import OhMyJesus from './OhMyJesus.json';
import FinalPrayer from './FinalPrayer.json';

export class InstructionsEN {

  code = "EN";
  
  getByIndex( index: number){
    const page = this.pages[index];
    return {page: page, mystery: page.decadeIndex ? Mysteries.Mysteries[page.decadeIndex] : undefined}
  }

  mysteries = Mysteries.Mysteries;

  pages: Page[] =  [
    { instruction: "Holding the Crucifix", file: Beginning, key: "cross.1"},
    { file: ApostlesCreed, key: "cross.2"},
    { instruction: "Hold first bead and Say", file: OurFather, key: "oval-1"},
    { instruction: "Hold second bead and Say", file: HailMary, key: "bead-1"},
    { instruction: "Hold third bead", file: HailMary, key: "bead-2"},
    { instruction: "Hold fourth bead", file: HailMary, key: "bead-3"},
    { instruction: "Hold fifth bead", file: GloryBe, key: "oval-2"},
    { instruction: "Announce the Mystery", decadeIndex: 0, key: "mary.1"},
    { instruction: "", file: OurFather, key: "mary.2"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 0, key: "bead-1-0"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 1, key: "bead-1-1"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 2, key: "bead-1-2"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 3, key: "bead-1-3"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 4, key: "bead-1-4"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 5, key: "bead-1-5"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 6, key: "bead-1-6"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 7, key: "bead-1-7"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 8, key: "bead-1-8"},
    { file: HailMary, decadeIndex: 0, mysteryIndex: 9, key: "bead-1-9"},
    { instruction: "", file: GloryBe, key: "decade-1"},
    { instruction: "", file: OhMyJesus, key: "decade-1"},
    { instruction: "Announce the Mystery", decadeIndex: 1, key: "decade-1"},
    { instruction: "", file: OurFather, key: "decade-1"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 0, key: "bead-2-0"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 1, key: "bead-2-1"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 2, key: "bead-2-2"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 3, key: "bead-2-3"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 4, key: "bead-2-4"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 5, key: "bead-2-5"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 6, key: "bead-2-6"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 7, key: "bead-2-7"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 8, key: "bead-2-8"},
    { file: HailMary, decadeIndex: 1, mysteryIndex: 9, key: "bead-2-9"},
    { instruction: "", file: GloryBe, key: "decade-2"},
    { instruction: "Announce the Mystery", decadeIndex: 2, key: "decade-2"},
    { instruction: "", file: OurFather, key: "decade-2"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 0, key: "bead-3-0"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 1, key: "bead-3-1"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 2, key: "bead-3-2"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 3, key: "bead-3-3"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 4, key: "bead-3-4"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 5, key: "bead-3-5"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 6, key: "bead-3-6"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 7, key: "bead-3-7"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 8, key: "bead-3-8"},
    { file: HailMary, decadeIndex: 2, mysteryIndex: 9, key: "bead-3-9"},
    { instruction: "", file: GloryBe, key: "decade-3"},
    { instruction: "", file: OhMyJesus, key: "decade-3"},
    { instruction: "Announce the Mystery", decadeIndex: 3, key: "decade-3"},
    { instruction: "", file: OurFather, key: "decade-3"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 0, key: "bead-4-0"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 1, key: "bead-4-1"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 2, key: "bead-4-2"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 3, key: "bead-4-3"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 4, key: "bead-4-4"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 5, key: "bead-4-5"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 6, key: "bead-4-6"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 7, key: "bead-4-7"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 8, key: "bead-4-8"},
    { file: HailMary, decadeIndex: 3, mysteryIndex: 9, key: "bead-4-9"},
    { instruction: "", file: GloryBe, key: "decade-4"},
    { instruction: "Announce the Mystery", decadeIndex: 4, key: "decade-4"},
    { instruction: "", file: OurFather , key: "decade-4"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 0, key: "bead-5-0"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 1, key: "bead-5-1"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 2, key: "bead-5-2"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 3, key: "bead-5-3"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 4, key: "bead-5-4"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 5, key: "bead-5-5"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 6, key: "bead-5-6"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 7, key: "bead-5-7"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 8, key: "bead-5-8"},
    { file: HailMary, decadeIndex: 4, mysteryIndex: 9, key: "bead-5-9"},
    { instruction: "", file: GloryBe, key: "cross.3"},
    { instruction: "", file: HailHolyQueen, key: "mary.3"},
    { instruction: "", file: FinalPrayer, key: "cross.4"},
    { instruction: "Make the sign of the cross", key: "cross.5"}
  ];

  homeTitle = "Welcome to the Rosary";
  home1 = "Take a deep breath and prepare for your journey. "
          + "Press Start when ever you are ready. "
          + "Just follow the prompts and you'll be fine. "
          + "If you do not have a rosary just imagine if you did. ";

  home2 = "Once you get started, at anytime you may press the home button to come back here."
          + "You may also click any bead, Mary or the Crucifix to begin or resume to any location on your path.";

  glossary = [ {key: "Start", translation: "Start"},
              {key: "Meditate", translation: "Meditate"},
              {key: "Cancel", translation: "Cancel"}];
}
