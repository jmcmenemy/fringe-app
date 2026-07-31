import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Papa from "papaparse";

const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSdAFEpJDVvI1L_f5GgtZjscx7IyDlbDma2nwlFqZt-UdbeoXNwDOOijfZtV6jmeDmKkpD6BDD3fZ1y/pub?output=csv";
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyl_SMJixwzsiH49kwZ8nf4vnrmA57bGFhVmb01gV75ASGqW1UgZE3yHUdE2EWBaT4e/exec";

const FALLBACK_SHOWS = [
  { booked:1, name:"Olga Koch: Fat Tom Cruise", link:"https://edfest.com/whats-on/olga-koch-fat-tom-cruise", price:"£19", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"17:30", end:"18:30", duration:"1h", ltf:true, date:"2026-08-05", attendees:"Me", tickets:1, address:"Pleasance Courtyard, 60 Pleasance, EH8 9TJ", notes:"" },
  { booked:1, name:"Margaret Thatcher Queen of Hollywood", link:"https://edfest.com/whats-on/margaret-thatcher-queen-of-hollywood", price:"£13", organiser:"Assembly", venue:"Assembly George Square Gardens", start:"20:40", end:"21:45", duration:"1h05", ltf:true, date:"2026-08-05", attendees:"Me, Pippa", tickets:2, address:"George Square, Edinburgh, EH8 9JZ", notes:"" },
  { booked:1, name:"The Bloody Ballad of Bette Davis", link:"https://edfest.com/whats-on/the-bloody-ballad-of-bette-davis", price:"£15", organiser:"Assembly", venue:"Assembly Roxy", start:"15:00", end:"16:00", duration:"1h", ltf:true, date:"2026-08-06", attendees:"Me, Mum", tickets:2, address:"2 Roxburgh Place, Edinburgh, EH8 9SU", notes:"" },
  { booked:1, name:"Fiona Allen: White Lies", link:"https://edfest.com/whats-on/fiona-allen-white-lies", price:"£16", organiser:"Gilded Balloon", venue:"Gilded Balloon Teviot", start:"18:00", end:"19:00", duration:"1h", ltf:false, date:"2026-08-06", attendees:"Me, Mum", tickets:2, address:"Teviot Row House, 13 Bristo Square, Edinburgh, EH8 9AJ", notes:"" },
  { booked:1, name:"Susie McCabe: Best Behaviour", link:"https://edfest.com/whats-on/susie-mccabe-coming-of-rage", price:"£16", organiser:"Assembly", venue:"Assembly George Square", start:"20:45", end:"21:45", duration:"1h", ltf:true, date:"2026-08-06", attendees:"Me, Mum", tickets:2, address:"George Square, Edinburgh, EH8 9LK", notes:"" },
  { booked:1, name:"Christopher Hall: Pizazz", link:"https://edfest.com/whats-on/christopher-hall-pizazz", price:"£16", organiser:"Gilded Balloon", venue:"Gilded Balloon Teviot", start:"20:20", end:"21:20", duration:"1h", ltf:false, date:"2026-08-10", attendees:"Me, Chlobo", tickets:2, address:"Teviot Row House, 13 Bristo Square, Edinburgh, EH8 9AJ", notes:"" },
  { booked:1, name:"Kim Blythe: Puzzle", link:"https://edfest.com/whats-on/kim-blythe-puzzle", price:"£16", organiser:"Gilded Balloon", venue:"Gilded Balloon Patter House", start:"19:00", end:"20:00", duration:"1h", ltf:false, date:"2026-08-11", attendees:"Me, StephY", tickets:2, address:"3 Chambers St, Edinburgh, EH1 1HT", notes:"" },
  { booked:1, name:"Abandoman: Afterglow", link:"https://edfest.com/whats-on/abandoman-afterglow", price:"£22", organiser:"Underbelly", venue:"Underbelly Cowgate", start:"20:55", end:"21:55", duration:"1h", ltf:true, date:"2026-08-14", attendees:"Me, Pippa", tickets:2, address:"66 Cowgate, Edinburgh, EH1 1JX", notes:"" },
  { booked:0, name:"Keep It Tight Podcast Live", link:"", price:"£16", organiser:"The Stand", venue:"28 York Place", start:"12:15", end:"13:15", duration:"1h", ltf:false, date:"2026-08-15", attendees:"Me, Ally, SophsT", tickets:3, address:"", notes:"" },
  { booked:1, name:"Sarah Hester Ross: Serving C*nt", link:"https://edfest.com/whats-on/sarah-hester-ross-serving-cnt", price:"£15", organiser:"Gilded Balloon", venue:"Gilded Balloon Teviot", start:"16:20", end:"17:20", duration:"1h", ltf:false, date:"2026-08-15", attendees:"Me, Ally, SophsT", tickets:3, address:"Teviot Row House, 13 Bristo Square, Edinburgh, EH8 9AJ", notes:"" },
  { booked:1, name:"Geraldine Hickey: A Weight Off My Chest", link:"https://edfest.com/whats-on/geraldine-hickey-a-weight-off-my-chest", price:"£13", organiser:"Assembly", venue:"Assembly George Square Studios", start:"18:40", end:"19:40", duration:"1h", ltf:true, date:"2026-08-15", attendees:"Me, Ally, SophsT", tickets:3, address:"George Square, Edinburgh, EH8 9LH", notes:"" },
  { booked:1, name:"Robin Grainger: Lemonade", link:"https://edfest.com/whats-on/robin-grainger-lemonade", price:"£16", organiser:"Assembly", venue:"Assembly George Square", start:"20:20", end:"21:20", duration:"1h", ltf:true, date:"2026-08-15", attendees:"Me, Ally, SophsT", tickets:3, address:"George Square, Edinburgh, EH8 9LK", notes:"" },
  { booked:1, name:"Best of the Fest", link:"https://edfest.com/whats-on/best-of-the-fest", price:"£18", organiser:"Assembly", venue:"Assembly George Square Gardens", start:"23:55", end:"01:10", duration:"1h15", ltf:true, date:"2026-08-15", attendees:"Me, Ally, SophsT", tickets:3, address:"George Square, Edinburgh, EH8 9JZ", notes:"" },
  { booked:1, name:"YUCK Circus: Naughties", link:"https://edfest.com/whats-on/yuck-circus-naughties", price:"£22", organiser:"Assembly", venue:"Assembly George Square Gardens", start:"16:40", end:"17:40", duration:"1h", ltf:true, date:"2026-08-16", attendees:"Me, Ally, SophsT", tickets:3, address:"George Square, Edinburgh, EH8 9JZ", notes:"" },
  { booked:1, name:"Tom Read Wilson: A-Z of Me", link:"https://edfest.com/whats-on/tom-read-wilson-a-z-of-me", price:"£12", organiser:"Gilded Balloon", venue:"Gilded Balloon at the Museum", start:"19:30", end:"20:30", duration:"1h", ltf:false, date:"2026-08-16", attendees:"Me, Ally, SophsT", tickets:3, address:"Lothian Street, Edinburgh, EH1 1HB", notes:"" },
  { booked:1, name:"Siegfried & Joy: Las Vegas in Edinburgh", link:"https://edfest.com/whats-on/siegfried-joy-las-vegas-in-edinburgh", price:"£19", organiser:"Assembly", venue:"Assembly George Square Gardens", start:"20:00", end:"21:00", duration:"1h", ltf:true, date:"2026-08-16", attendees:"Rach", tickets:2, address:"George Square, Edinburgh, EH8 9JZ", notes:"£8 each" },
  { booked:1, name:"Rosco McClelland: Foodbank Fundraiser", link:"https://edfest.com/whats-on/rosco-mcclelland-and-friends-a-foodbank-fundraiser", price:"£17", organiser:"Assembly", venue:"Assembly George Square Studios", start:"18:25", end:"19:25", duration:"1h", ltf:true, date:"2026-08-17", attendees:"Me, FiRalph", tickets:2, address:"George Square, Edinburgh, EH8 9LH", notes:"" },
  { booked:1, name:"Hard to Swallow: Reuben Kaye", link:"https://edfest.com/whats-on/hard-to-swallow-reuben-kaye", price:"£22", organiser:"Assembly", venue:"Assembly George Square Gardens", start:"20:00", end:"21:05", duration:"1h05", ltf:true, date:"2026-08-21", attendees:"Me, LisaMo, Pippa", tickets:3, address:"George Square, Edinburgh, EH8 9JZ", notes:"" },
  { booked:1, name:"Otto and Astrid", link:"https://edfest.com/whats-on/otto-astrid-the-stages-tour", price:"", organiser:"Assembly", venue:"Assembly Roxy", start:"21:20", end:"22:30", duration:"1h10", ltf:false, date:"2026-08-21", attendees:"Me, LisaMo, Pippa", tickets:3, address:"2 Roxburgh Place, Edinburgh, EH8 9SU", notes:"" },
  { booked:1, name:"Kiell Smith-Bynoe: Kool Story Bro", link:"https://edfest.com/whats-on/kiell-smith-bynoes-kool-story-bro", price:"£21", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"23:15", end:"00:15", duration:"1h", ltf:false, date:"2026-08-21", attendees:"Me, LisaMo, Pippa", tickets:3, address:"Pleasance Courtyard, 60 Pleasance, EH8 9TJ", notes:"" },
  { booked:1, name:"Maisie Adam: Comedy at the Fringe", link:"https://edfest.com/whats-on/maisie-adam-presents-comedy-at-the-fringe", price:"Free", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"16:00", end:"17:00", duration:"1h", ltf:false, date:"2026-08-25", attendees:"Me, Mum", tickets:2, address:"Pleasance Courtyard, 60 Pleasance, EH8 9TJ", notes:"" },
  { booked:1, name:"The Kaye Hole: Reuben Kaye", link:"https://edfest.com/whats-on/the-kaye-hole-hosted-by-reuben-kaye", price:"£24", organiser:"Underbelly", venue:"Underbelly Bristo Square", start:"23:30", end:"01:00", duration:"1h30", ltf:false, date:"2026-08-28", attendees:"Me", tickets:1, address:"Bristo Square, Edinburgh, EH8 9AG", notes:"" },
  { booked:1, name:"Hot Dub Time Machine: House Party", link:"https://edfest.com/whats-on/hot-dub-time-machine-presents-house-party", price:"£30", organiser:"Assembly", venue:"Assembly Hall", start:"23:00", end:"01:00", duration:"2h", ltf:true, date:"2026-08-29", attendees:"Me, FiRalph", tickets:2, address:"Mound Place, Edinburgh, EH1 2LU", notes:"" },
];
const FALLBACK_WISHLIST = [
  { name:"5 Mistakes That Changed History", organiser:"Assembly", venue:"Assembly George Square", start:"12:40", price:"", ltf:false },
  { name:"Joe Lycett & Friends", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"15:30", price:"£21", ltf:false },
  { name:"Ruby Wax: Absolutely Famous", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"15:30", price:"£23", ltf:false },
  { name:"Rosie Jones: I Can't Tell What She's Saying", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"16:00", price:"£18", ltf:false },
  { name:"Russell Howard: Work in Progress", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"16:00", price:"£16", ltf:false },
  { name:"Showstopper! The Improvised Musical", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"17:20", price:"£26", ltf:false },
  { name:"Annie Boyle: To All The Boys I've Loved Before", organiser:"Underbelly", venue:"Underbelly Bristo Square", start:"17:25", price:"£15", ltf:true },
  { name:"Julian Clary: Fully Dilated", organiser:"Assembly", venue:"Assembly Rooms", start:"17:30", price:"£18", ltf:false },
  { name:"NewsRevue", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"18:00", price:"£20", ltf:false },
  { name:"In Pour Taste", organiser:"Assembly", venue:"Assembly Rooms", start:"18:30", price:"£28", ltf:false },
  { name:"Sophie Garrad: A Period Drama", organiser:"Pleasance", venue:"Pleasance Dome", start:"18:50", price:"£17", ltf:false },
  { name:"David O'Doherty: At This Stage", organiser:"Assembly", venue:"Assembly George Square", start:"19:10", price:"", ltf:false },
  { name:"Nina's C*nti Cabaret", organiser:"Underbelly", venue:"Underbelly Bristo Square", start:"19:15", price:"£27", ltf:false },
  { name:"Colin Cloud: Hoax", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"19:30", price:"£20", ltf:false },
  { name:"Emma Doran: Emmaculate", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"19:30", price:"£20", ltf:false },
  { name:"Jack Docherty", organiser:"Gilded Balloon", venue:"Gilded Balloon Teviot", start:"19:30", price:"£15", ltf:false },
  { name:"Paul Black: Cash Cow", organiser:"Gilded Balloon", venue:"Gilded Balloon at the Museum", start:"19:30", price:"£18", ltf:false },
  { name:"Tia Kofi: The Final FronTia Live", organiser:"Gilded Balloon", venue:"Gilded Saloon", start:"19:40", price:"£15", ltf:false },
  { name:"Grace Campbell: The Lady Is a Tramp", organiser:"Gilded Balloon", venue:"Gilded Balloon Teviot", start:"20:30", price:"£19", ltf:false },
  { name:"MCU: Musical Comedians Unite!", organiser:"Gilded Balloon", venue:"Gilded Balloon Patter House", start:"20:40", price:"£14", ltf:false },
  { name:"Karen Dunbar: Chirpy", organiser:"Just The Tonic", venue:"Just the Tonic Nucleus", start:"20:45", price:"£21", ltf:false },
  { name:"All Killa No Filla: Live!", organiser:"Pleasance", venue:"Pleasance Courtyard", start:"21:30", price:"£25", ltf:false },
  { name:"Chris & Lizzie Hall: Stay Hydrated Live!", organiser:"Gilded Balloon", venue:"Gilded Balloon Teviot", start:"21:45", price:"£15", ltf:false },
  { name:"Sophie's Surprise 29th", organiser:"Underbelly", venue:"Underbelly Circus Hub", start:"21:45", price:"£22", ltf:false },
  { name:"Share the Craic", organiser:"Underbelly", venue:"Underbelly George Square", start:"22:20", price:"£15", ltf:true },
  { name:"FLIGHT", organiser:"Assembly", venue:"Assembly George Square", start:"", price:"£13", ltf:true },
];

const OC = {
  "Assembly":       { bg: "#FF4D6A", glow: "rgba(255,77,106,0.3)" },
  "Pleasance":      { bg: "#FFBA08", glow: "rgba(255,186,8,0.3)" },
  "Gilded Balloon": { bg: "#FF6FB7", glow: "rgba(255,111,183,0.3)" },
  "Underbelly":     { bg: "#A855F7", glow: "rgba(168,85,247,0.3)" },
  "The Stand":      { bg: "#94A3B8", glow: "rgba(148,163,184,0.3)" },
  "Just The Tonic": { bg: "#F59E0B", glow: "rgba(245,158,11,0.3)" },
  "Monkey Barrel":  { bg: "#FB923C", glow: "rgba(251,146,60,0.3)" },
};
const BG = "#0B0B1A";
const CARD = "rgba(255,255,255,0.06)";
const CARD_BORDER = "rgba(255,255,255,0.1)";
const TXT = "#F1F0F7";
const TXT2 = "rgba(241,240,247,0.5)";
const TXT3 = "rgba(241,240,247,0.3)";
const ACCENT = "linear-gradient(135deg, #FF4D6A, #A855F7)";

const DAY_NAMES_SHORT = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS_FULL = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const ALLOWED_DOMAINS = ["edfest.com","edfringe.com","pleasance.co.uk","assemblyfestival.com","assemblyfest.com","gildedballoon.co.uk","justthetonic.com","monkeybarrelcomedy.co.uk","monkeybarrelcomedy.com","thestand.co.uk","underbellyedinburgh.co.uk","underbelly.co.uk"];

function parseTime(t){if(!t)return null;const c=t.trim().replace(/:\d{2}$/,"");if(!/^\d{1,2}:\d{2}$/.test(c))return null;return c;}
function parseDate(d){if(!d)return null;const p=d.trim().split("/");if(p.length!==3)return null;const[dd,mm,yyyy]=p;if(!dd||!mm||!yyyy||yyyy.length!==4)return null;return`${yyyy}-${mm.padStart(2,"0")}-${dd.padStart(2,"0")}`;}
function parseDuration(s,e){const sm=timeToMinutes(parseTime(s));const em=timeToMinutes(parseTime(e));if(sm===null||em===null)return"";let d=em-sm;if(d<=0)d+=24*60;const h=Math.floor(d/60);const m=d%60;if(h&&m)return`${h}h${m.toString().padStart(2,"0")}`;if(h)return`${h}h`;return`${m}m`;}
function durationMinutes(show){const s=timeToMinutes(show.start);const e=timeToMinutes(show.end);if(s===null||e===null)return 0;let d=e-s;if(d<=0)d+=24*60;return d;}
function parseCSVToShows(csv){const r=Papa.parse(csv,{skipEmptyLines:true});const rows=r.data;if(rows.length<2)return{shows:[],wishlist:[]};const shows=[],wishlist=[];const hdr=rows[0].map(h=>(h||"").toString().trim().toLowerCase());const availIdx=hdr.indexOf("availability");for(let i=1;i<rows.length;i++){const r2=rows[i];const name=(r2[2]||"").trim();if(!name)continue;const bf=(r2[0]||"").trim();const link=(r2[3]||"").trim();const price=(r2[4]||"").trim();const org=(r2[5]||"").trim();const venue=(r2[6]||"").trim();const st=parseTime(r2[7]);const et=parseTime(r2[8]);const ltf=(r2[10]||"").trim().toLowerCase()==="yes";const booked=(r2[11]||"").trim().toLowerCase()==="yes"?1:0;const date=parseDate(r2[12]);const att=(r2[14]||"").trim();const tix=parseInt(r2[15])||0;const notes=(r2[18]||"").trim();const addr=(r2[19]||"").trim();const dur=parseDuration(r2[7],r2[8]);const avail=availIdx>=0?(r2[availIdx]||"").trim():"";const show={name,link,price,organiser:org,venue,start:st,end:et,duration:dur,ltf,booked,date,attendees:att,tickets:tix,notes,address:addr,availability:avail};if(date)shows.push(show);else if(name&&bf==="0")wishlist.push(show);}return{shows,wishlist};}
function timeToMinutes(t){if(!t)return null;const[h,m]=t.split(":").map(Number);return h*60+m;}
function formatTime(t){if(!t)return"";const[h,m]=t.split(":");const hr=parseInt(h);const ap=hr>=12?"pm":"am";const h12=hr===0?12:hr>12?hr-12:hr;return`${h12}:${m}${ap}`;}
function formatHour(min){const h=Math.floor(min/60);const ap=h>=12?"pm":"am";const h12=h===0?12:h>12?h-12:h;return`${h12}${ap}`;}
function getMonday(ds){const d=new Date(ds+"T12:00:00");const day=d.getDay();const diff=day===0?-6:1-day;const m=new Date(d);m.setDate(m.getDate()+diff);return m;}
function dateToStr(d){return d.toISOString().slice(0,10);}
function addDays(d,n){const r=new Date(d);r.setDate(r.getDate()+n);return r;}
function getWeeks(shows){const m=new Set();shows.filter(s=>s.date).forEach(s=>m.add(dateToStr(getMonday(s.date))));return[...m].sort();}
function extractPostcode(a){if(!a)return null;const m=a.match(/[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}/i);return m?m[0]:null;}
function mapsUrl(a){return`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(a)}`;}
function matchesSearch(show,q){if(!q)return true;const l=q.toLowerCase();return[show.name,show.venue,show.start,show.end,show.attendees,show.organiser,show.address,show.price].filter(Boolean).some(f=>f.toLowerCase().includes(l));}

const UserIcon=()=>(<svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" style={{flexShrink:0,opacity:0.7}}><path d="M8 8a3 3 0 100-6 3 3 0 000 6zm-5.5 7a5.5 5.5 0 0111 0H2.5z"/></svg>);
const FilterIcon=()=>(<svg width="13" height="13" viewBox="0 0 16 16" fill="currentColor"><path d="M1.5 1.5A.5.5 0 012 1h12a.5.5 0 01.5.5v2a.5.5 0 01-.128.334L10 8.692V13.5a.5.5 0 01-.342.474l-3 1A.5.5 0 016 14.5V8.692L1.628 3.834A.5.5 0 011.5 3.5v-2z"/></svg>);
const PlusIcon=()=>(<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M8 2a.75.75 0 01.75.75v4.5h4.5a.75.75 0 010 1.5h-4.5v4.5a.75.75 0 01-1.5 0v-4.5h-4.5a.75.75 0 010-1.5h4.5v-4.5A.75.75 0 018 2z"/></svg>);
const StarIcon=()=>(<svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" style={{flexShrink:0}}><path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/></svg>);
const XIcon=()=>(<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M4.646 4.646a.5.5 0 01.708 0L8 7.293l2.646-2.647a.5.5 0 01.708.708L8.707 8l2.647 2.646a.5.5 0 01-.708.708L8 8.707l-2.646 2.647a.5.5 0 01-.708-.708L7.293 8 4.646 5.354a.5.5 0 010-.708z"/></svg>);
const SpinnerIcon=()=>(<svg width="15" height="15" viewBox="0 0 16 16" fill="currentColor" style={{animation:"spin 1s linear infinite"}}><style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style><path d="M8 1a7 7 0 00-7 7h2a5 5 0 015-5V1z" opacity="0.7"/></svg>);

export default function FringeCalendar(){
  const[allShows,setAllShows]=useState(FALLBACK_SHOWS);
  const[wishlist,setWishlist]=useState(FALLBACK_WISHLIST);
  const[recommendations,setRecommendations]=useState([]);
  const[dataSource,setDataSource]=useState("saved");
  const[view,setView]=useState("calendar");
  const[selectedShow,setSelectedShow]=useState(null);
  const[filter,setFilter]=useState("all");
  const[weekIdx,setWeekIdx]=useState(0);
  const[showFilterMenu,setShowFilterMenu]=useState(false);
  const[sortBy,setSortBy]=useState("time");
  const[timeFilter,setTimeFilter]=useState("all");
  const[searchQuery,setSearchQuery]=useState("");
  const[showAddModal,setShowAddModal]=useState(false);
  const[addUrl,setAddUrl]=useState("");
  const[addLoading,setAddLoading]=useState(false);
  const[addError,setAddError]=useState("");
  const gridRef=useRef(null);

  useEffect(()=>{(async()=>{try{const r=await window.storage.get("fringe-recommendations");if(r&&r.value)setRecommendations(JSON.parse(r.value));}catch{}})();},[]);
  const saveRecs=useCallback(async(recs)=>{setRecommendations(recs);try{await window.storage.set("fringe-recommendations",JSON.stringify(recs));}catch{}},[]);
  useEffect(()=>{(async()=>{try{const res=await fetch(SHEET_URL);if(!res.ok)return;const text=await res.text();const{shows,wishlist:wl}=parseCSVToShows(text);if(shows.length>0){setAllShows(shows);setWishlist(wl);setDataSource("live");}}catch{}})();},[]);

  const filteredShows=useMemo(()=>{let s=allShows.filter(s=>s.date);if(filter==="booked")s=s.filter(s=>s.booked===1);else if(filter==="unbooked")s=s.filter(s=>s.booked===0);else if(filter!=="all")s=s.filter(s=>s.organiser===filter);if(searchQuery.trim())s=s.filter(s=>matchesSearch(s,searchQuery));if(timeFilter!=="all"){s=s.filter(sh=>{const m=timeToMinutes(sh.start);if(m===null)return false;if(timeFilter==="morning")return m<720;if(timeFilter==="afternoon")return m>=720&&m<1020;if(timeFilter==="evening")return m>=1020&&m<1320;if(timeFilter==="late")return m>=1320||m<120;return true;});}return s;},[filter,allShows,searchQuery,timeFilter]);
  const weeks=useMemo(()=>getWeeks(filteredShows),[filteredShows]);
  useEffect(()=>{if(weekIdx>=weeks.length)setWeekIdx(Math.max(0,weeks.length-1));},[weeks,weekIdx]);
  const currentMonday=weeks[weekIdx]||"2026-08-03";
  const weekDates=useMemo(()=>{const m=new Date(currentMonday+"T12:00:00");return Array.from({length:7},(_,i)=>dateToStr(addDays(m,i)));},[currentMonday]);
  const showsByDate=useMemo(()=>{const map={};filteredShows.forEach(s=>{if(!map[s.date])map[s.date]=[];map[s.date].push(s);});Object.values(map).forEach(arr=>{if(sortBy==="duration")arr.sort((a,b)=>durationMinutes(a)-durationMinutes(b));else arr.sort((a,b)=>(timeToMinutes(a.start)||0)-(timeToMinutes(b.start)||0));});return map;},[filteredShows,sortBy]);

  const SH=80;const START_H=10;const END_H=26;const totalSlots=(END_H-START_H);
  function showTop(s){let m=timeToMinutes(s.start);if(m===null)return 0;if(m<START_H*60)m+=24*60;return((m-START_H*60)/60)*SH;}
  function showHeight(s){let st=timeToMinutes(s.start);let en=timeToMinutes(s.end);if(st===null||en===null)return SH;if(en<=st)en+=24*60;if(st<START_H*60)st+=24*60;return Math.max(((en-st)/60)*SH,SH*0.4);}

  useEffect(()=>{if(view==="calendar"&&gridRef.current){const first=weekDates.reduce((min,date)=>{(showsByDate[date]||[]).forEach(s=>{let m=timeToMinutes(s.start);if(m!==null){if(m<START_H*60)m+=24*60;if(m<min)min=m;}});return min;},Infinity);if(first<Infinity)gridRef.current.scrollTop=Math.max(0,((first-START_H*60)/60)*SH-20);}},[view,weekIdx,currentMonday,showsByDate]);

  const [now, setNow] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setNow(new Date()), 60000); return () => clearInterval(t); }, []);
  const todayStr = dateToStr(now);
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const totalSpend=useMemo(()=>allShows.filter(s=>s.booked===1&&s.price).reduce((sum,s)=>{const n=parseFloat(s.price.replace("£","").replace("Free","0"));return sum+(isNaN(n)?0:n*(s.tickets||1));},0),[allShows]);
  const bookedCount=allShows.filter(s=>s.booked===1).length;
  const organisers=useMemo(()=>[...new Set(allShows.map(s=>s.organiser).filter(Boolean))],[allShows]);
  const dates=useMemo(()=>[...new Set(filteredShows.map(s=>s.date))].sort(),[filteredShows]);
  const refreshData=async()=>{try{const res=await fetch(SHEET_URL);if(!res.ok)return;const text=await res.text();const{shows,wishlist:wl}=parseCSVToShows(text);if(shows.length>0){setAllShows(shows);setWishlist(wl);setDataSource("live");}}catch{}};
  const filteredWishlist=useMemo(()=>{if(!searchQuery.trim())return wishlist;return wishlist.filter(s=>matchesSearch(s,searchQuery));},[wishlist,searchQuery]);
  const filteredRecs=useMemo(()=>{let r=recommendations;if(filter!=="all"&&filter!=="booked"&&filter!=="unbooked")r=r.filter(x=>x.organiser===filter);if(searchQuery.trim())r=r.filter(x=>matchesSearch(x,searchQuery));return r;},[recommendations,filter,searchQuery]);

  const handleAddShow=async()=>{
    if(!addUrl.trim())return;const url=addUrl.trim();
    try{const h=new URL(url).hostname.replace("www.","");if(!ALLOWED_DOMAINS.some(d=>h===d||h.endsWith("."+d))){setAddError("Use a link from edfest.com, edfringe.com, or a venue site.");return;}}catch{setAddError("That doesn't look like a valid URL.");return;}
    setAddLoading(true);setAddError("");
    try{
      // Use Claude with web search to look up the show — avoids CORS issues
      const aiRes=await fetch("https://api.anthropic.com/v1/messages",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:"claude-sonnet-4-6",max_tokens:1000,tools:[{type:"web_search_20250305",name:"web_search"}],messages:[{role:"user",content:`Look up this Edinburgh Fringe show page and extract the details: ${url}

Also search edfringe.com for this show to get the most accurate data.

Return ONLY valid JSON with no markdown backticks, no explanation.
{"name":"Show Name","organiser":"Venue Company e.g. Pleasance/Assembly/Gilded Balloon/Underbelly/Just The Tonic/Monkey Barrel/The Stand","venue":"Specific venue name","start":"HH:MM","end":"HH:MM","price":"£X","duration":"1h","address":"Full address with postcode if available","description":"One sentence summary of the show"}
Use empty string "" for any field you cannot find.`}]})});
      if(!aiRes.ok)throw new Error("Couldn't look up show details");
      const aiData=await aiRes.json();
      const aiText=(aiData.content||[]).map(c=>c.text||"").filter(Boolean).join("").replace(/```json|```/g,"").trim();
      // Find the JSON object in the response
      const jsonMatch=aiText.match(/\{[\s\S]*\}/);
      if(!jsonMatch)throw new Error("Couldn't extract show details");
      const parsed=JSON.parse(jsonMatch[0]);
      const newRec={id:Date.now(),name:parsed.name||"Unknown Show",organiser:parsed.organiser||"",venue:parsed.venue||"",start:parsed.start||"",end:parsed.end||"",price:parsed.price||"",duration:parsed.duration||"",address:parsed.address||"",description:parsed.description||"",link:url,isRecommendation:true};
      await saveRecs([...recommendations,newRec]);
      if(APPS_SCRIPT_URL){try{await fetch(APPS_SCRIPT_URL,{method:"POST",mode:"no-cors",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:newRec.name,organiser:newRec.organiser,venue:newRec.venue,start:newRec.start,end:newRec.end,price:newRec.price,duration:newRec.duration,address:newRec.address,description:newRec.description,link:newRec.link})});}catch{}}
      setAddUrl("");setShowAddModal(false);
    }catch(e){setAddError(e.message||"Something went wrong.");}finally{setAddLoading(false);}
  };
  const removeRec=async(id)=>{await saveRecs(recommendations.filter(r=>r.id!==id));};

  const gc=(org)=>OC[org]||{bg:"#64748B",glow:"rgba(100,116,139,0.3)"};

  return(
    <div style={{fontFamily:"'Inter',system-ui,-apple-system,sans-serif",maxWidth:960,margin:"0 auto",color:TXT,padding:"0 4px",background:BG,minHeight:"100vh"}}>

      {/* HEADER */}
      <div style={{textAlign:"center",padding:"32px 16px 24px",background:`linear-gradient(180deg, rgba(168,85,247,0.15) 0%, transparent 100%)`,borderBottom:`1px solid ${CARD_BORDER}`}}>
        <div style={{fontSize:13,fontWeight:700,letterSpacing:3,textTransform:"uppercase",color:TXT2,marginBottom:8}}>Edinburgh</div>
        <h1 style={{fontSize:40,fontWeight:900,letterSpacing:"-1px",margin:0,background:ACCENT,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",lineHeight:1.1}}>FRINGE 2026</h1>
        <div style={{display:"flex",justifyContent:"center",gap:16,marginTop:12,fontSize:13,color:TXT2}}>
        </div>
        <p onClick={refreshData} style={{fontSize:12,color:TXT3,margin:"8px 0 16px",cursor:"pointer",letterSpacing:"0.5px"}}>
          {dataSource==="live"?"✓ LIVE FROM GOOGLE SHEETS":"USING SAVED DATA · TAP TO REFRESH"}
        </p>
        <div style={{display:"flex",gap:4,justifyContent:"center",flexWrap:"wrap",alignItems:"center"}}>
          <TabBtn active={view==="calendar"} onClick={()=>setView("calendar")}>Calendar</TabBtn>
          <TabBtn active={view==="list"} onClick={()=>setView("list")}>View All</TabBtn>
          <TabBtn active={view==="wishlist"} onClick={()=>setView("wishlist")}>Wishlist</TabBtn>
          <TabBtn active={view==="recs"} onClick={()=>setView("recs")} accent>Picks</TabBtn>
          <span style={{fontSize:13,color:TXT3,fontWeight:600,padding:"6px 12px",borderRadius:20,background:"rgba(255,255,255,0.06)",marginLeft:2}}>{bookedCount} shows</span>
        </div>
      </div>

      {/* FILTERS */}
      <div style={{display:"flex",gap:5,padding:"14px 8px 6px",flexWrap:"wrap",justifyContent:"center",alignItems:"center"}}>
        <Chip a={filter==="all"} o={()=>setFilter("all")}>All</Chip>
        <Chip a={filter==="booked"} o={()=>setFilter("booked")} c="#34D399">Booked</Chip>
        <Chip a={filter==="unbooked"} o={()=>setFilter("unbooked")} c="#FB923C">Unbooked</Chip>
        {organisers.map(o=>(<Chip key={o} a={filter===o} o={()=>setFilter(o)} c={gc(o).bg}>{o}</Chip>))}
        <button onClick={()=>setShowFilterMenu(!showFilterMenu)} style={{padding:"5px 12px",borderRadius:20,border:"none",fontSize:13,fontWeight:700,cursor:"pointer",background:showFilterMenu?TXT:"rgba(255,255,255,0.85)",color:showFilterMenu?BG:BG,display:"flex",alignItems:"center",gap:4}}><FilterIcon/> Sort & Search</button>
      </div>
      {showFilterMenu&&(
        <div style={{padding:"8px 16px 14px",display:"flex",gap:8,flexWrap:"wrap",alignItems:"center",justifyContent:"center"}}>
          <input type="text" placeholder="Search everything..." value={searchQuery} onChange={e=>setSearchQuery(e.target.value)}
            style={{padding:"8px 14px",borderRadius:12,border:`1px solid ${CARD_BORDER}`,fontSize:13,width:260,outline:"none",color:TXT,background:"rgba(255,255,255,0.06)"}}/>
          <div style={{display:"flex",gap:4}}>
            <TimeBtn a={timeFilter==="all"} o={()=>setTimeFilter("all")}>All</TimeBtn>
            <TimeBtn a={timeFilter==="morning"} o={()=>setTimeFilter("morning")} e="🌅">Morning</TimeBtn>
            <TimeBtn a={timeFilter==="afternoon"} o={()=>setTimeFilter("afternoon")} e="☀️">Afternoon</TimeBtn>
            <TimeBtn a={timeFilter==="evening"} o={()=>setTimeFilter("evening")} e="🌆">Evening</TimeBtn>
            <TimeBtn a={timeFilter==="late"} o={()=>setTimeFilter("late")} e="🌙">Late</TimeBtn>
          </div>
        </div>
      )}

      {/* CALENDAR */}
      {view==="calendar"&&(
        <div style={{padding:"8px 0"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"0 8px 12px"}}>
            <NavBtn disabled={weekIdx===0} onClick={()=>setWeekIdx(Math.max(0,weekIdx-1))}>‹</NavBtn>
            <span style={{fontSize:17,fontWeight:700,color:TXT}}>{(()=>{const m=new Date(currentMonday+"T12:00:00");const s=addDays(m,6);return`${m.getDate()} ${MONTHS[m.getMonth()]} – ${s.getDate()} ${MONTHS[s.getMonth()]}`;})()}</span>
            <NavBtn disabled={weekIdx>=weeks.length-1} onClick={()=>setWeekIdx(Math.min(weeks.length-1,weekIdx+1))}>›</NavBtn>
          </div>
          <div style={{overflowX:"auto",WebkitOverflowScrolling:"touch"}}>
            <div style={{minWidth:600}}>
              <div style={{display:"grid",gridTemplateColumns:"48px repeat(7, 1fr)",borderBottom:`1px solid ${CARD_BORDER}`,position:"sticky",top:0,background:BG,zIndex:10}}>
                <div/>
                {weekDates.map((ds,i)=>{const d=new Date(ds+"T12:00:00");const has=(showsByDate[ds]||[]).length>0;const isToday=ds===todayStr;return(
                  <div key={ds} style={{textAlign:"center",padding:"6px 2px 8px",background:isToday?"rgba(168,85,247,0.15)":"transparent",borderRadius:isToday?"8px 8px 0 0":"0"}}>
                    <div style={{fontSize:12,fontWeight:700,color:isToday?"#C084FC":TXT3,textTransform:"uppercase",letterSpacing:1}}>{DAY_NAMES_SHORT[i]}</div>
                    <div style={{fontSize:20,fontWeight:800,lineHeight:1.4,color:isToday?"#C084FC":has?TXT:TXT3}}>{d.getDate()}</div>
                  </div>);})}
              </div>
              <div ref={gridRef} style={{overflowY:"auto",maxHeight:520,position:"relative"}}>
                <div style={{display:"grid",gridTemplateColumns:"48px repeat(7, 1fr)",position:"relative",height:totalSlots*SH}}>
                  <div style={{position:"relative"}}>
                    {Array.from({length:totalSlots},(_,i)=>{const mins=START_H*60+i*60;const dm=mins>=24*60?mins-24*60:mins;return <div key={i} style={{position:"absolute",top:i*SH-7,right:6,fontSize:11,fontWeight:600,color:TXT3,lineHeight:1}}>{formatHour(dm)}</div>;})}
                  </div>
                  {weekDates.map(ds=>{const dayShows=showsByDate[ds]||[];const isToday=ds===todayStr;const timeLineTop=(()=>{if(!isToday)return null;let m=nowMinutes;if(m<START_H*60)m+=24*60;if(m>=END_H*60)return null;return((m-START_H*60)/60)*SH;})();return(
                    <div key={ds} style={{position:"relative",borderLeft:`1px solid rgba(255,255,255,0.05)`,height:totalSlots*SH,background:isToday?"rgba(168,85,247,0.06)":"transparent"}}>
                      {Array.from({length:totalSlots},(_,i)=>(<div key={i} style={{position:"absolute",top:i*SH,left:0,right:0,height:1,background:"rgba(255,255,255,0.07)"}}/>))}
                      {timeLineTop!==null&&<div style={{position:"absolute",top:timeLineTop,left:0,right:0,height:2,background:"#C084FC",zIndex:5,boxShadow:"0 0 8px rgba(192,132,252,0.6)"}}><div style={{position:"absolute",left:-3,top:-3,width:8,height:8,borderRadius:4,background:"#C084FC"}}/></div>}
                      {dayShows.map((show,si)=>{const c=gc(show.organiser);const top=showTop(show);const height=showHeight(show);const sm=height<SH*1.5;return(
                        <div key={si} onClick={()=>setSelectedShow(show)} style={{
                          position:"absolute",top,left:2,right:2,height,background:c.bg,color:"#fff",
                          borderRadius:8,padding:sm?"4px 6px":"6px 8px",cursor:"pointer",overflow:"hidden",zIndex:3,
                          fontSize:sm?13:16,lineHeight:1.3,boxShadow:`0 2px 8px ${c.glow}`,
                          border:!show.booked?"2px dashed rgba(255,255,255,0.4)":"none",opacity:show.booked?1:0.75,
                        }}>
                          <div style={{fontWeight:700,lineHeight:1.2}}>{show.name}</div>
                          <div style={{opacity:0.75,marginTop:2,fontSize:sm?9:11}}>{show.venue.replace("Assembly ","").replace("Gilded Balloon ","GB ").replace("Underbelly ","UB ").replace("Pleasance ","")}</div>
                          {!sm&&<div style={{opacity:0.85,marginTop:1,fontSize:11}}>{formatTime(show.start)}</div>}
                        </div>);})}
                    </div>);})}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW ALL */}
      {view==="list"&&(
        <div style={{padding:"8px 0"}}>
          {dates.map(date=>{const d=new Date(date+"T12:00:00");const dayShows=showsByDate[date]||[];if(!dayShows.length)return null;
            const timeSlots=[
              {label:"Morning",emoji:"🌅",filter:s=>{const m=timeToMinutes(s.start);return m!==null&&m<720;}},
              {label:"Afternoon",emoji:"☀️",filter:s=>{const m=timeToMinutes(s.start);return m!==null&&m>=720&&m<1020;}},
              {label:"Evening",emoji:"🌆",filter:s=>{const m=timeToMinutes(s.start);return m!==null&&m>=1020&&m<1320;}},
              {label:"Late",emoji:"🌙",filter:s=>{const m=timeToMinutes(s.start);return m!==null&&(m>=1320||m<120);}},
            ];
            return(
            <div key={date} style={{marginBottom:28}}>
              <div style={{display:"flex",alignItems:"baseline",gap:8,padding:"0 12px",marginBottom:12}}>
                <span style={{fontSize:40,fontWeight:900,lineHeight:1,background:ACCENT,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{d.getDate()}</span>
                <span style={{fontSize:15,fontWeight:600,color:TXT2,textTransform:"uppercase",letterSpacing:1}}>{DAYS_FULL[d.getDay()]} {MONTHS[d.getMonth()]}</span>
                <span style={{fontSize:13,color:TXT3,marginLeft:"auto"}}>{dayShows.length} show{dayShows.length!==1?"s":""}</span>
              </div>
              {timeSlots.map(slot=>{const slotShows=dayShows.filter(slot.filter);if(!slotShows.length)return null;return(
                <div key={slot.label} style={{marginBottom:12}}>
                  <div style={{display:"flex",alignItems:"center",gap:6,padding:"0 12px",marginBottom:6}}>
                    <span style={{fontSize:14}}>{slot.emoji}</span>
                    <span style={{fontSize:13,fontWeight:700,color:TXT2,textTransform:"uppercase",letterSpacing:1}}>{slot.label}</span>
                    <div style={{flex:1,height:1,background:CARD_BORDER,marginLeft:4}}/>
                  </div>
                  <div style={{display:"flex",flexDirection:"column",gap:6}}>
                    {slotShows.map((show,i)=><ShowCard key={i} show={show} onClick={()=>setSelectedShow(show)}/>)}
                  </div>
                </div>);})}
            </div>);})}
        </div>
      )}

      {/* WISHLIST */}
      {view==="wishlist"&&(
        <div style={{padding:"16px 8px"}}>
          <p style={{fontSize:14,color:TXT2,margin:"0 0 16px",textAlign:"center"}}>{filteredWishlist.length} shows still to book</p>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            {filteredWishlist.map((show,i)=><ShowCard key={i} show={show} onClick={()=>setSelectedShow(show)}/>)}
          </div>
        </div>
      )}

      {/* RECOMMENDATIONS */}
      {view==="recs"&&(
        <div style={{padding:"16px 12px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
            <p style={{fontSize:14,color:TXT2,margin:0}}>{filteredRecs.length} pick{filteredRecs.length!==1?"s":""}</p>
            <button onClick={()=>{setShowAddModal(true);setAddError("");setAddUrl("");}} style={{display:"flex",alignItems:"center",gap:5,padding:"8px 18px",borderRadius:12,border:"none",background:ACCENT,color:"#fff",fontSize:14,fontWeight:700,cursor:"pointer"}}><PlusIcon/> Add Show</button>
          </div>
          {filteredRecs.length===0&&(
            <div style={{textAlign:"center",padding:"48px 20px",color:TXT3}}>
              <div style={{fontSize:36,marginBottom:8}}>🎭</div>
              <div style={{fontSize:16,fontWeight:600,color:TXT2}}>No picks yet</div>
              <div style={{fontSize:14,marginTop:4}}>Paste a link from any Fringe venue site</div>
            </div>
          )}
          {filteredRecs.map(rec=>{const c=gc(rec.organiser);const pc=extractPostcode(rec.address);return(
            <div key={rec.id} style={{background:CARD,border:`1px solid ${CARD_BORDER}`,borderRadius:16,padding:16,marginBottom:8,position:"relative",backdropFilter:"blur(8px)"}}>
              <button onClick={()=>removeRec(rec.id)} style={{position:"absolute",top:10,right:10,background:"none",border:"none",cursor:"pointer",color:TXT3,padding:4}}><XIcon/></button>
              <div style={{display:"flex",gap:6,alignItems:"center",marginBottom:8}}>
                <span style={{display:"inline-flex",alignItems:"center",gap:4,fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:6,background:"rgba(168,85,247,0.2)",color:"#C084FC"}}><StarIcon/> PICK</span>
                {rec.organiser&&<span style={{fontSize:11,fontWeight:700,padding:"3px 8px",borderRadius:6,background:`${c.bg}22`,color:c.bg}}>{rec.organiser}</span>}
              </div>
              <div style={{fontSize:18,fontWeight:700,color:TXT,marginBottom:4}}>{rec.name}</div>
              {rec.description&&<div style={{fontSize:14,color:TXT2,marginBottom:8,lineHeight:1.4}}>{rec.description}</div>}
              <div style={{display:"flex",flexWrap:"wrap",gap:10,fontSize:13,color:TXT2}}>
                {rec.venue&&<span>📍 {rec.venue}</span>}
                {rec.start&&<span>🕐 {formatTime(rec.start)}{rec.end?` – ${formatTime(rec.end)}`:""}</span>}
                {rec.price&&<span>🎟️ {rec.price}</span>}
              </div>
              <div style={{display:"flex",gap:10,marginTop:10}}>
                {rec.link&&<a href={rec.link} target="_blank" rel="noopener noreferrer" style={{fontSize:13,fontWeight:600,color:c.bg}}>View listing →</a>}
                {pc&&<a href={mapsUrl(rec.address)} target="_blank" rel="noopener noreferrer" style={{fontSize:13,fontWeight:600,color:"#60A5FA"}}>{pc} ↗</a>}
              </div>
            </div>);})}
        </div>
      )}

      {/* ADD MODAL */}
      {showAddModal&&(
        <div onClick={()=>!addLoading&&setShowAddModal(false)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#151528",border:`1px solid ${CARD_BORDER}`,borderRadius:20,padding:28,maxWidth:440,width:"100%",boxShadow:"0 24px 80px rgba(0,0,0,0.6)"}}>
            <h3 style={{fontSize:22,fontWeight:800,margin:"0 0 4px",color:TXT}}>Add a Show</h3>
            <p style={{fontSize:14,color:TXT2,margin:"0 0 16px"}}>Paste a link from any Edinburgh Fringe venue website</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:4,marginBottom:14}}>
              {["edfest.com","edfringe.com","Pleasance","Assembly","Gilded Balloon","Underbelly","The Stand","Monkey Barrel"].map(s=>(
                <span key={s} style={{fontSize:11,padding:"3px 8px",borderRadius:6,background:"rgba(255,255,255,0.06)",color:TXT2,fontWeight:500}}>{s}</span>
              ))}
            </div>
            <input type="url" placeholder="https://..." value={addUrl} onChange={e=>setAddUrl(e.target.value)} disabled={addLoading}
              style={{width:"100%",padding:"12px 14px",borderRadius:12,border:`1px solid ${CARD_BORDER}`,fontSize:14,outline:"none",color:TXT,background:"rgba(255,255,255,0.06)",boxSizing:"border-box",marginBottom:14}}
              onKeyDown={e=>{if(e.key==="Enter")handleAddShow();}}/>
            {addError&&<p style={{fontSize:14,color:"#FF4D6A",margin:"0 0 12px"}}>{addError}</p>}
            <div style={{display:"flex",gap:8,justifyContent:"flex-end"}}>
              <button onClick={()=>setShowAddModal(false)} disabled={addLoading} style={{padding:"10px 18px",borderRadius:12,border:`1px solid ${CARD_BORDER}`,background:"transparent",color:TXT2,fontSize:15,fontWeight:600,cursor:"pointer"}}>Cancel</button>
              <button onClick={handleAddShow} disabled={addLoading||!addUrl.trim()} style={{padding:"10px 22px",borderRadius:12,border:"none",background:ACCENT,color:"#fff",fontSize:15,fontWeight:700,cursor:addLoading?"wait":"pointer",opacity:addLoading||!addUrl.trim()?0.5:1,display:"flex",alignItems:"center",gap:6}}>{addLoading&&<SpinnerIcon/>}{addLoading?"Extracting...":"Add Show"}</button>
            </div>
          </div>
        </div>
      )}

      {/* SHOW DETAIL MODAL */}
      {selectedShow&&(
        <div onClick={()=>setSelectedShow(null)} style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.7)",backdropFilter:"blur(4px)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,padding:16}}>
          <div onClick={e=>e.stopPropagation()} style={{background:"#151528",border:`1px solid ${CARD_BORDER}`,borderRadius:20,padding:28,maxWidth:420,width:"100%",boxShadow:"0 24px 80px rgba(0,0,0,0.6)",position:"relative",maxHeight:"90vh",overflowY:"auto"}}>
            <button onClick={()=>setSelectedShow(null)} style={{position:"absolute",top:14,right:16,background:"none",border:"none",fontSize:20,cursor:"pointer",color:TXT3}}>×</button>
            <div style={{display:"inline-block",fontSize:12,fontWeight:700,padding:"4px 12px",borderRadius:8,marginBottom:14,background:gc(selectedShow.organiser).bg,color:"#fff",letterSpacing:"0.5px"}}>{selectedShow.organiser}</div>
            <h2 style={{fontSize:24,fontWeight:800,margin:"0 0 4px",color:TXT,lineHeight:1.2}}>{selectedShow.name}</h2>
            <div style={{fontSize:14,color:TXT2,marginBottom:18}}>{selectedShow.venue}</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"14px 16px",fontSize:15,marginBottom:18}}>
              {selectedShow.date&&<Dt l="Date">{(()=>{const d=new Date(selectedShow.date+"T12:00:00");return`${DAYS_FULL[d.getDay()]} ${d.getDate()} ${MONTHS[d.getMonth()]}`;})()}</Dt>}
              {!selectedShow.date&&<Dt l="Date">TBC</Dt>}
              <Dt l="Time">{selectedShow.start?formatTime(selectedShow.start):"TBC"}{selectedShow.end?` – ${formatTime(selectedShow.end)}`:""}</Dt>
              <Dt l="Price">{selectedShow.price||"TBC"}</Dt>
              {selectedShow.duration&&<Dt l="Duration">{selectedShow.duration}</Dt>}
              {selectedShow.attendees&&<div style={{gridColumn:"1 / -1"}}>
                <div style={{fontSize:12,color:TXT3,marginBottom:4,textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>Going</div>
                <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
                  {selectedShow.attendees.split(",").map((p,pi)=>(
                    <span key={pi} style={{display:"inline-flex",alignItems:"center",gap:4,background:"rgba(255,255,255,0.08)",color:TXT,padding:"4px 10px",borderRadius:20,fontSize:13,fontWeight:600}}><UserIcon/>{p.trim()}</span>
                  ))}
                </div>
              </div>}
              <Dt l="Status"><span style={{color:selectedShow.booked?"#34D399":"#FB923C",fontWeight:700}}>{selectedShow.booked?"Booked ✓":"Not booked"}</span></Dt>
              {selectedShow.availability&&<Dt l="Availability"><span style={{color:selectedShow.availability==="Sold Out"?"#EF4444":selectedShow.availability==="Limited"?"#FB923C":selectedShow.availability==="Available"?"#34D399":TXT,fontWeight:700}}>{selectedShow.availability}</span></Dt>}
            </div>
            {selectedShow.ltf&&<div style={{fontSize:13,background:"rgba(255,186,8,0.1)",color:"#FFBA08",padding:"8px 12px",borderRadius:10,marginBottom:12,fontWeight:600}}>LoveTheFringe discount applied</div>}
            {selectedShow.notes&&<div style={{fontSize:14,color:TXT2,fontStyle:"italic",marginBottom:12}}>{selectedShow.notes}</div>}
            {selectedShow.address&&(()=>{const pc=extractPostcode(selectedShow.address);return(
              <div style={{fontSize:14,color:TXT2,marginBottom:18}}>📍 {pc?(<>{selectedShow.address.replace(pc,"").replace(/,\s*$/,"")}{", "}<a href={mapsUrl(selectedShow.address)} target="_blank" rel="noopener noreferrer" style={{color:"#60A5FA",fontWeight:600}}>{pc}</a></>):(<a href={mapsUrl(selectedShow.address)} target="_blank" rel="noopener noreferrer" style={{color:"#60A5FA"}}>{selectedShow.address}</a>)}</div>);})()}
            {selectedShow.link&&<a href={selectedShow.link} target="_blank" rel="noopener noreferrer" style={{display:"block",textAlign:"center",padding:"12px 16px",borderRadius:12,background:gc(selectedShow.organiser).bg,color:"#fff",textDecoration:"none",fontSize:15,fontWeight:700}}>View on EdFest →</a>}
          </div>
        </div>
      )}

      {/* LEGEND */}
      <div style={{padding:"24px 12px 40px",borderTop:`1px solid ${CARD_BORDER}`,marginTop:16}}>
        <div style={{fontSize:11,color:TXT3,marginBottom:10,textTransform:"uppercase",letterSpacing:2,fontWeight:700}}>Venues</div>
        <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
          {Object.entries(OC).map(([name,c])=>(<div key={name} style={{display:"flex",alignItems:"center",gap:5,fontSize:13}}><div style={{width:8,height:8,borderRadius:4,background:c.bg,boxShadow:`0 0 6px ${c.glow}`}}/><span style={{color:TXT2}}>{name}</span></div>))}
        </div>
      </div>
    </div>
  );
}

function ShowCard({show,onClick}){
  const c=gc2(show.organiser);const pc=extractPostcode(show.address);
  return(
    <div onClick={onClick} style={{display:"flex",alignItems:"stretch",cursor:"pointer",borderRadius:14,overflow:"hidden",background:CARD,border:`1px solid ${CARD_BORDER}`,marginLeft:8,marginRight:8,backdropFilter:"blur(8px)",transition:"transform 0.15s"}}>
      <div style={{width:4,background:c.bg,flexShrink:0}}/>
      <div style={{flex:1,padding:"12px 14px",minWidth:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:8}}>
          <div style={{minWidth:0}}>
            <div style={{fontSize:16,fontWeight:700,color:TXT,lineHeight:1.3}}>
              {show.name}{!show.booked&&<span style={{marginLeft:6,fontSize:10,background:"rgba(251,146,60,0.15)",color:"#FB923C",padding:"2px 6px",borderRadius:4,fontWeight:700}}>unbooked</span>}
              {show.ltf&&<span style={{marginLeft:6,fontSize:10,background:"rgba(255,186,8,0.2)",color:"#FFBA08",padding:"2px 6px",borderRadius:4,fontWeight:700}}>LTF</span>}
            </div>
            <div style={{fontSize:13,color:TXT2,marginTop:3}}>
              {show.venue}{pc&&<> · <a href={mapsUrl(show.address)} target="_blank" rel="noopener noreferrer" onClick={e=>e.stopPropagation()} style={{color:"#60A5FA",fontWeight:600}}>{pc}</a></>}
              {show.availability&&<> · <span style={{fontWeight:600,color:show.availability==="Sold Out"?"#EF4444":show.availability==="Limited"?"#FB923C":show.availability==="Available"?"#34D399":TXT2}}>{show.availability}</span></>}
            </div>
          </div>
          <div style={{textAlign:"right",flexShrink:0}}>
            <div style={{fontSize:15,fontWeight:700,color:c.bg}}>{formatTime(show.start)}</div>
            <div style={{fontSize:12,color:TXT3}}>{show.duration}</div>
          </div>
        </div>
        {show.attendees&&(
          <div style={{display:"flex",gap:4,marginTop:7,flexWrap:"wrap"}}>
            {show.attendees.split(",").map((p,pi)=>(
              <span key={pi} style={{display:"inline-flex",alignItems:"center",gap:3,background:"rgba(255,255,255,0.07)",color:TXT2,padding:"2px 8px",borderRadius:10,fontSize:13,fontWeight:600}}><UserIcon/>{p.trim()}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function gc2(org){return OC[org]||{bg:"#64748B",glow:"rgba(100,116,139,0.3)"};}

function TabBtn({active,onClick,children,accent}){
  return <button onClick={onClick} style={{padding:"8px 20px",borderRadius:24,border:"none",fontSize:14,fontWeight:700,cursor:"pointer",letterSpacing:"0.3px",background:active?(accent?ACCENT:"rgba(255,255,255,0.12)"):"transparent",color:active?"#fff":accent?"#C084FC":TXT2,transition:"all 0.15s"}}>{children}</button>;
}
function Chip({a,o,children,c}){
  const bg=c||"#FF4D6A";
  return <button onClick={o} style={{padding:"5px 14px",borderRadius:20,border:`1px solid ${a?bg:CARD_BORDER}`,fontSize:12,fontWeight:700,cursor:"pointer",background:a?bg:"transparent",color:a?"#fff":TXT2,transition:"all 0.15s"}}>{children}</button>;
}
function TimeBtn({a,o,children,e}){
  return <button onClick={o} style={{padding:"6px 12px",borderRadius:12,border:`1px solid ${a?"#FF4D6A":CARD_BORDER}`,fontSize:12,fontWeight:700,cursor:"pointer",background:a?"#FF4D6A":"transparent",color:a?"#fff":TXT2,display:"flex",alignItems:"center",gap:4}}>{e&&<span style={{fontSize:14}}>{e}</span>}{children}</button>;
}
function NavBtn({disabled,onClick,children}){
  return <button onClick={onClick} disabled={disabled} style={{background:disabled?"rgba(255,255,255,0.05)":ACCENT,border:"none",fontSize:18,fontWeight:700,cursor:disabled?"default":"pointer",opacity:disabled?0.3:1,padding:0,color:"#fff",width:42,height:42,borderRadius:21,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0,boxShadow:disabled?"none":"0 4px 16px rgba(168,85,247,0.3)"}}>{children}</button>;
}
function Dt({l,children}){
  return <div><div style={{fontSize:12,color:TXT3,marginBottom:2,textTransform:"uppercase",letterSpacing:1,fontWeight:700}}>{l}</div><div style={{fontWeight:600,color:TXT}}>{children}</div></div>;
}
