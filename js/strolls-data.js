// ============================================================
// DATA
// ============================================================

// Each stroll:
//   id       — unique, kebab-case, used as a lookup key
//   title    — display name
//   ward     — display text
//   walkTime — display text, e.g. "about 40 min walk"
//   desc     — one paragraph
//   stops    — array of { t: title, d: description, ll: [lat, lon] }
//   route    — array of [lat, lon] pairs, the actual walking path
const STROLLS_DATA = [
  {
    id: "toronto-island",
    title: "Toronto Island",
    ward: "Spadina–Fort York",
    walkTime: "about 40 min walk",
    desc: "The Toronto Islands have long been a sacred place among the Mississaugas and other First Nations, a spot for healing and rest, and a summer refuge for the whole city ever since.",
    stops: [
      { t: "Toronto Island Ferries & Ward's Island Docks", d: "Hop the ferry that's carried islanders across the harbour for almost 180 years.", ll: [43.63128683, -79.35730896] },
      { t: "Ward's Island Homes", d: "About 250 cottage-style homes, some of the last of their kind on the waterfront.", ll: [43.63269888, -79.35517779] },
      { t: "Fire Station 335 & 'Fire & Water' Installation", d: "A working fire station with a 1995 art piece built right into its clock tower.", ll: [43.62536695, -79.35949364] },
      { t: "St. Andrew by-the-Lake Anglican Church", d: "A heritage wooden church dating back to 1884.", ll: [43.62019355, -79.36983231] },
      { t: "Centreville Amusement Park & Far Enough Farm", d: "Rides, a petting zoo, and a full-size replica of a small Ontario town.", ll: [43.62036425, -79.37366766] }
    ],
    route: [[43.631311,-79.357227],[43.631363,-79.357033],[43.631338,-79.356954],[43.631301,-79.356616],[43.631373,-79.356554],[43.63165,-79.356126],[43.631694,-79.355702],[43.631745,-79.355666],[43.632039,-79.355392],[43.632297,-79.355281],[43.632379,-79.355262],[43.63267,-79.355182],[43.632379,-79.355262],[43.632297,-79.355281],[43.632039,-79.355392],[43.631745,-79.355666],[43.631694,-79.355702],[43.631197,-79.355987],[43.630748,-79.356869],[43.629797,-79.356184],[43.629482,-79.356123],[43.628663,-79.356291],[43.627388,-79.357236],[43.625745,-79.358993],[43.623391,-79.362443],[43.62268,-79.363205],[43.622066,-79.364141],[43.621881,-79.364816],[43.621447,-79.365697],[43.621335,-79.366563],[43.621302,-79.367167],[43.62111,-79.367627],[43.620896,-79.368133],[43.62075,-79.368896],[43.620454,-79.369453],[43.620131,-79.369858],[43.619762,-79.36986],[43.619688,-79.3698],[43.619298,-79.369821],[43.61904,-79.370175],[43.618845,-79.370861],[43.618413,-79.371711],[43.618577,-79.372616],[43.618451,-79.373084],[43.618559,-79.373823],[43.619943,-79.375102],[43.620075,-79.374387],[43.620019,-79.373781],[43.620524,-79.373599]]
  },
  {
    id: "south-riverdale",
    title: "South Riverdale",
    ward: "Toronto–Danforth, Beaches–East York",
    walkTime: "about 5 min walk",
    desc: "A cultural hub layered with manufacturing history and public art: murals, heritage buildings, and a bridge that's been rebuilt more times than anyone can count.",
    stops: [
      { t: "Queen Street Viaduct", d: "Rebuilt again and again since its wooden-bridge days in the 1800s; now steel, since 1911.", ll: [43.65814756, -79.35341315] },
      { t: "Chief Lady Bird & Dave Monday Oguorie Mural", d: "Tells the story of Tkaronto as a meeting place for all people.", ll: [43.65845311, -79.35223022] },
      { t: "Girls Mural Camp, 'Mural in Riverside'", d: "Painted by youth through a program for girls, young women, and non-binary artists.", ll: [43.65896182, -79.35162761] },
      { t: "The Broadview Hotel", d: "Once a tollgate marking Toronto's eastern edge, now a landmark corner.", ll: [43.65896376, -79.35019263] },
      { t: "'Alquimia' Mural by Jacquie Comrie", d: "A semi-abstract homage to the Riverside neighbourhood by a Toronto-based artist.", ll: [43.65914714, -79.34979835] }
    ],
    route: [[43.658152,-79.353382],[43.658424,-79.352275],[43.658707,-79.352388],[43.658818,-79.351931],[43.658872,-79.35172],[43.658585,-79.351593],[43.658722,-79.350968],[43.658927,-79.349971],[43.658981,-79.349791],[43.659262,-79.349909]]
  },
  {
    id: "long-branch",
    title: "Long Branch",
    ward: "Lakeshore-Queensway",
    walkTime: "about 40 min walk",
    desc: "A lakeshore community that grew from farmland into a summer resort in the 1800s, still full of parks and public art along the water.",
    stops: [
      { t: "Yasaman Mehrsa Artbox", d: "A small painted utility box turned into a piece of neighbourhood art.", ll: [43.59137849, -79.5440095] },
      { t: "Toronto Public Library, Long Branch", d: "A neighbourhood branch that's been a community anchor for generations.", ll: [43.59523109, -79.53125652] },
      { t: "'Bring the Lake up to Lakeshore' Mural", d: "A mural by Barb Symmons celebrating the neighbourhood's waterfront identity.", ll: [43.59505068, -79.53061706] },
      { t: "Laburnham Park", d: "A quiet green space tucked into the residential streets near the lake.", ll: [43.60000255, -79.52786557] },
      { t: "Richard and Lucy Newborn House", d: "A heritage home from the neighbourhood's early resort era.", ll: [43.59844522, -79.52489596] }
    ],
    route: [[43.59139,-79.543916],[43.59202,-79.54321],[43.592211,-79.542743],[43.5925,-79.541756],[43.592753,-79.540563],[43.592996,-79.539346],[43.593249,-79.538223],[43.593299,-79.537987],[43.59357,-79.536961],[43.593902,-79.535569],[43.594271,-79.533974],[43.594444,-79.534055],[43.595145,-79.53103],[43.595454,-79.529911],[43.595182,-79.529771],[43.595083,-79.530222],[43.595182,-79.529771],[43.595223,-79.529598],[43.5955,-79.529711],[43.59575,-79.529786],[43.596186,-79.529976],[43.596646,-79.530177],[43.59768,-79.530627],[43.597912,-79.530728],[43.598146,-79.52971],[43.598866,-79.530043],[43.599585,-79.526999],[43.600378,-79.527404],[43.599585,-79.526999],[43.598866,-79.530043],[43.598146,-79.52971],[43.597912,-79.530728],[43.59768,-79.530627],[43.597919,-79.529615],[43.597472,-79.529437],[43.597255,-79.529079],[43.59779,-79.526856],[43.598196,-79.525142]]
  }
];
