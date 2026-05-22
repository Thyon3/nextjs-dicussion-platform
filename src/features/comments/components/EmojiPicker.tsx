'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BsSearch } from 'react-icons/bs';

interface EmojiData {
  emoji: string;
  name: string;
}

interface EmojiCategory {
  id: string;
  name: string;
  icon: string;
  emojis: EmojiData[];
}

const EMOJI_CATEGORIES: EmojiCategory[] = [
  {
    id: "smileys",
    name: "Smileys & Emotion",
    icon: "😀",
    emojis: [
      { emoji: "😀", name: "grinning face smiley" },
      { emoji: "😃", name: "grinning face big eyes smiley" },
      { emoji: "😄", name: "grinning face smiling eyes smiley" },
      { emoji: "😁", name: "beaming face smiling eyes smiley" },
      { emoji: "😆", name: "grinning squinting face smiley" },
      { emoji: "😅", name: "grinning face sweat smiley" },
      { emoji: "🤣", name: "rolling on floor laughing rofl laugh" },
      { emoji: "😂", name: "face with tears of joy laugh tears" },
      { emoji: "🙂", name: "slightly smiling face" },
      { emoji: "🙃", name: "upside down face" },
      { emoji: "😉", name: "winking face wink" },
      { emoji: "😊", name: "smiling face smiling eyes" },
      { emoji: "😇", name: "smiling face halo angel" },
      { emoji: "🥰", name: "smiling face hearts love" },
      { emoji: "😍", name: "smiling face heart eyes love" },
      { emoji: "🤩", name: "star struck stars" },
      { emoji: "😘", name: "face blowing kiss love kiss" },
      { emoji: "😋", name: "face savoring food delicious yum" },
      { emoji: "😛", name: "face tongue out" },
      { emoji: "😜", name: "winking face tongue out wink" },
      { emoji: "🤪", name: "zany face crazy" },
      { emoji: "😝", name: "squinting face tongue out" },
      { emoji: "🤗", name: "hugging face hug" },
      { emoji: "🤭", name: "face hand over mouth oops" },
      { emoji: "🤫", name: "shushing face quiet shh" },
      { emoji: "🤔", name: "thinking face think" },
      { emoji: "🤐", name: "zipper mouth face quiet" },
      { emoji: "🤨", name: "face raised eyebrow check" },
      { emoji: "😐", name: "neutral face meh" },
      { emoji: "😑", name: "expressionless face" },
      { emoji: "😏", name: "smirking face smirk" },
      { emoji: "😒", name: "unamused face annoyed" },
      { emoji: "🙄", name: "face rolling eyes roll" },
      { emoji: "😬", name: "grimacing face awkward" },
      { emoji: "😌", name: "relieved face peaceful" },
      { emoji: "😔", name: "pensive face sad" },
      { emoji: "😪", name: "sleepy face sleep" },
      { emoji: "😴", name: "sleeping face sleep" },
      { emoji: "😷", name: "face medical mask sick" },
      { emoji: "🤢", name: "nauseated face sick gross" },
      { emoji: "🤮", name: "face vomiting sick gross" },
      { emoji: "🥵", name: "hot face red warm" },
      { emoji: "🥶", name: "cold face blue freezing" },
      { emoji: "🥴", name: "woozy face dizzy" },
      { emoji: "🤯", name: "exploding head mindblown" },
      { emoji: "🥳", name: "partying face celebrate party" },
      { emoji: "😎", name: "smiling face sunglasses cool" },
      { emoji: "🤓", name: "nerd face geek" },
      { emoji: "🧐", name: "face monocle" },
      { emoji: "😕", name: "confused face" },
      { emoji: "😟", name: "worried face" },
      { emoji: "☹️", name: "frowning face sad" },
      { emoji: "😲", name: "astonished face shock" },
      { emoji: "😳", name: "flushed face blush" },
      { emoji: "🥺", name: "pleading face puppy eyes" },
      { emoji: "😢", name: "crying face cry sad" },
      { emoji: "😭", name: "loudly crying face sob cry" },
      { emoji: "😤", name: "face steam nose mad angry" },
      { emoji: "😠", name: "angry face mad" },
      { emoji: "😡", name: "pouting face mad angry" },
      { emoji: "🤬", name: "face symbols mouth swear curse" },
      { emoji: "💀", name: "skull skeleton death" },
      { emoji: "💩", name: "pile of poo poop" },
      { emoji: "👻", name: "ghost halloween" },
      { emoji: "👽", name: "alien space" },
      { emoji: "🤖", name: "robot face" },
    ]
  },
  {
    id: "gestures",
    name: "Gestures & Hands",
    icon: "👍",
    emojis: [
      { emoji: "👋", name: "waving hand wave hello hi" },
      { emoji: "✋", name: "raised hand high five" },
      { emoji: "🖖", name: "vulcan salute spock" },
      { emoji: "👌", name: "ok hand okay perfect" },
      { emoji: "🤌", name: "pinched fingers wait" },
      { emoji: "🤏", name: "pinching hand small" },
      { emoji: "✌️", name: "victory hand peace" },
      { emoji: "🤞", name: "crossed fingers luck" },
      { emoji: "🤟", name: "love you gesture" },
      { emoji: "🤘", name: "sign of horns rockon metal" },
      { emoji: "🤙", name: "call me hand phone" },
      { emoji: "👈", name: "pointing left" },
      { emoji: "👉", name: "pointing right" },
      { emoji: "👆", name: "pointing up" },
      { emoji: "🖕", name: "middle finger" },
      { emoji: "👇", name: "pointing down" },
      { emoji: "👍", name: "thumbs up like yes approve" },
      { emoji: "👎", name: "thumbs down dislike no" },
      { emoji: "✊", name: "raised fist power" },
      { emoji: "👊", name: "oncoming fist punch" },
      { emoji: "👏", name: "clapping hands clap bravo" },
      { emoji: "🙌", name: "raising hands celebrate" },
      { emoji: "👐", name: "open hands" },
      { emoji: "🙏", name: "folded hands pray please thanks" },
      { emoji: "💪", name: "flexed biceps muscle strong" },
      { emoji: "🧠", name: "brain intelligence mind" },
      { emoji: "👀", name: "eyes look see watch" },
    ]
  },
  {
    id: "hearts",
    name: "Hearts & Symbols",
    icon: "❤️",
    emojis: [
      { emoji: "❤️", name: "red heart love" },
      { emoji: "🧡", name: "orange heart love" },
      { emoji: "💛", name: "yellow heart love" },
      { emoji: "💚", name: "green heart love" },
      { emoji: "💙", name: "blue heart love" },
      { emoji: "💜", name: "purple heart love" },
      { emoji: "🖤", name: "black heart love" },
      { emoji: "🤍", name: "white heart love" },
      { emoji: "💔", name: "broken heart love breakup" },
      { emoji: "❤️‍🔥", name: "heart on fire love burning" },
      { emoji: "💕", name: "two hearts love" },
      { emoji: "💞", name: "revolving hearts love" },
      { emoji: "💓", name: "beating heart love" },
      { emoji: "💗", name: "growing heart love" },
      { emoji: "💖", name: "sparkling heart love shiny" },
      { emoji: "💘", name: "heart with arrow valentine" },
      { emoji: "🔥", name: "fire hot flame lit" },
      { emoji: "✨", name: "sparkles shine magic" },
      { emoji: "⭐", name: "star gold" },
      { emoji: "🌟", name: "glowing star" },
      { emoji: "💥", name: "collision boom bang explosion" },
      { emoji: "💯", name: "hundred points perfect 100" },
      { emoji: "💬", name: "speech balloon chat comment" },
      { emoji: "🎉", name: "party popper celebrate" },
    ]
  },
  {
    id: "nature",
    name: "Animals & Nature",
    icon: "🌸",
    emojis: [
      { emoji: "🐶", name: "dog face puppy pet" },
      { emoji: "🐱", name: "cat face kitty pet" },
      { emoji: "🐹", name: "hamster face pet" },
      { emoji: "🐰", name: "rabbit face bunny" },
      { emoji: "🦊", name: "fox face" },
      { emoji: "🐻", name: "bear face" },
      { emoji: "🐼", name: "panda face" },
      { emoji: "🐸", name: "frog face" },
      { emoji: "🐵", name: "monkey face" },
      { emoji: "🐧", name: "penguin" },
      { emoji: "🐝", name: "honeybee bee insect" },
      { emoji: "🦋", name: "butterfly" },
      { emoji: "🐙", name: "octopus" },
      { emoji: "🐬", name: "dolphin" },
      { emoji: "🦄", name: "unicorn magic" },
      { emoji: "🍀", name: "four leaf clover luck" },
      { emoji: "🌸", name: "cherry blossom flower spring" },
      { emoji: "☀️", name: "sun weather hot summer" },
      { emoji: "🌧️", name: "cloud with rain weather rain" },
      { emoji: "❄️", name: "snowflake cold weather winter" },
      { emoji: "🌈", name: "rainbow sky colorful" },
    ]
  },
  {
    id: "gaming",
    name: "Gaming & Objects",
    icon: "🎮",
    emojis: [
      { emoji: "🎮", name: "video game controller gaming console" },
      { emoji: "🕹️", name: "joystick game arcade" },
      { emoji: "👾", name: "alien monster video game pixel" },
      { emoji: "🎲", name: "game die board game dice luck" },
      { emoji: "🎯", name: "bullseye target game aim" },
      { emoji: "🏆", name: "trophy gold award winner" },
      { emoji: "👑", name: "crown king queen" },
      { emoji: "💎", name: "gem stone diamond rich" },
      { emoji: "🎁", name: "wrapped gift present birthday" },
      { emoji: "💡", name: "light bulb idea smart" },
      { emoji: "💰", name: "money bag cash rich" },
      { emoji: "⚔️", name: "crossed swords fight battle weapon" },
      { emoji: "🛡️", name: "shield protection defense" },
      { emoji: "🍔", name: "hamburger food burger eat" },
      { emoji: "🍕", name: "pizza food slice eat" },
      { emoji: "☕", name: "hot beverage coffee tea cup" },
      { emoji: "🍺", name: "beer mug drink alcohol" },
    ]
  }
];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
}

const EmojiPicker: React.FC<EmojiPickerProps> = ({ onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('smileys');
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  // Scrollspy: Detect which category section is visible to highlight the active bottom tab
  const handleScroll = () => {
    if (searchQuery.trim()) return; // Disable scrollspy during search
    
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    const containerTop = scrollContainer.getBoundingClientRect().top;
    
    let activeId = EMOJI_CATEGORIES[0].id;
    let minDiff = Infinity;

    EMOJI_CATEGORIES.forEach(category => {
      const el = categoryRefs.current[category.id];
      if (el) {
        const topDiff = Math.abs(el.getBoundingClientRect().top - containerTop - 10);
        if (topDiff < minDiff) {
          minDiff = topDiff;
          activeId = category.id;
        }
      }
    });

    setActiveCategory(activeId);
  };

  // Scroll smoothly to a specific category section (Telegram-like behavior)
  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const targetElement = categoryRefs.current[id];
    const scrollContainer = scrollContainerRef.current;

    if (targetElement && scrollContainer) {
      const targetTop = targetElement.offsetTop - scrollContainer.offsetTop;
      scrollContainer.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });
    }
  };

  // Filter emojis based on query
  const getFilteredResults = () => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return null;

    const matched: EmojiData[] = [];
    EMOJI_CATEGORIES.forEach(category => {
      category.emojis.forEach(emojiItem => {
        if (emojiItem.name.includes(query)) {
          matched.push(emojiItem);
        }
      });
    });
    return matched;
  };

  const searchResults = getFilteredResults();

  return (
    <div 
      ref={containerRef}
      className="absolute bottom-[52px] left-0 z-50 w-[310px] h-[370px] flex flex-col backdrop-blur-md bg-card/95 border border-border shadow-2xl rounded-2xl overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200"
    >
      {/* ── Search Bar (Top) ───────────────────────────────── */}
      <div className="p-2.5 border-b border-border bg-card/80">
        <div className="relative">
          <BsSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-3.5 h-3.5" />
          <input
            type="text"
            placeholder="Search emojis"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-muted/50 focus:bg-muted text-[13px] text-foreground placeholder:text-muted-foreground pl-8 pr-3 py-1.5 rounded-full border border-transparent focus:border-[#FF5722] focus:outline-none transition-all duration-150"
            autoFocus
          />
        </div>
      </div>

      {/* ── Scrollable Emojis List (Middle) ──────────────────── */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto p-3 scroll-smooth scrollbar-thin"
      >
        {searchResults ? (
          <div>
            <div className="text-[11px] font-bold text-muted-foreground px-1 pb-2 tracking-wide uppercase">
              Search Results ({searchResults.length})
            </div>
            {searchResults.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground text-[12px]">
                <span>No emojis found</span>
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {searchResults.map((emojiItem) => (
                  <button
                    key={emojiItem.emoji}
                    type="button"
                    onClick={() => onSelect(emojiItem.emoji)}
                    className="w-9 h-9 flex items-center justify-center text-[21px] rounded-lg hover:bg-muted/70 hover:scale-120 active:scale-95 transition-all duration-75"
                    title={emojiItem.name}
                  >
                    {emojiItem.emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          EMOJI_CATEGORIES.map((category) => (
            <div 
              key={category.id} 
              ref={(el) => { categoryRefs.current[category.id] = el; }}
              className="mb-4"
            >
              <div className="text-[11px] font-bold text-muted-foreground px-1 pb-1.5 tracking-wide uppercase">
                {category.name}
              </div>
              <div className="grid grid-cols-7 gap-1">
                {category.emojis.map((emojiItem) => (
                  <button
                    key={emojiItem.emoji}
                    type="button"
                    onClick={() => onSelect(emojiItem.emoji)}
                    className="w-9 h-9 flex items-center justify-center text-[21px] rounded-lg hover:bg-muted/70 hover:scale-120 active:scale-95 transition-all duration-75"
                    title={emojiItem.name}
                  >
                    {emojiItem.emoji}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Category Tab Bar (Bottom - Telegram Style) ──────── */}
      {!searchQuery.trim() && (
        <div className="flex justify-between px-3 py-2 border-t border-border bg-card/90 backdrop-blur-md">
          {EMOJI_CATEGORIES.map(category => (
            <button
              key={category.id}
              type="button"
              onClick={() => scrollToCategory(category.id)}
              className={`p-1.5 rounded-xl text-[18px] hover:bg-muted/65 transition-all flex items-center justify-center flex-1 cursor-pointer ${
                activeCategory === category.id 
                  ? 'bg-muted text-[#FF5722] scale-110 shadow-sm border border-border/40' 
                  : 'text-muted-foreground/80 hover:text-foreground scale-95'
              }`}
              title={category.name}
            >
              {category.icon}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmojiPicker;
