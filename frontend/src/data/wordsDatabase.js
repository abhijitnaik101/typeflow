const wordsDatabase = {
    easy: [
      "aqua", "blip", "crux", "dawn", "echo", "flux", "glow", "hush", "iris", "jade",
      "kite", "lava", "muse", "neon", "omen", "pact", "quip", "roam", "sway", "torn",
      "urge", "vibe", "wisp", "xray", "yelp", "zeal", "axle", "brim", "clap", "dime",
      "envy", "fizz", "gaze", "hilt", "inch", "jolt", "keel", "lure", "moor", "navy",
      "ogle", "pave", "quip", "ramp", "slim", "toil", "urge", "vain", "wink", "xeno",
      "yarn", "zinc", "amber", "brisk", "charm", "drift", "elbow", "fable", "glide",
      "hover", "ideal", "jazzy", "kneel", "lunar", "mirth", "nifty", "olive", "plush",
      "query", "relay", "sheep", "tidal", "usher", "vowel", "witty", "xerox", "yodel",
      "zonal", "adore", "blend", "craft", "demon", "ethos", "frost", "gravy", "hazel",
      "inlet", "jolly", "koala", "lucid", "mound", "nerve", "onset", "plead", "quirk",
      "rumor", "swarm", "tumor", "upper", "vivid", "whale", "xenon", "youth", "zebra",
      "aloe", "beam", "clue", "dove", "emit", "fern", "glow", "harp", "idea", "jazz",
      "kick", "lime", "maze", "node", "oval", "pipe", "quiz", "rise", "seal", "tree",
      "unit", "vase", "wing", "xray", "yoga", "zone", "apple", "brave", "crisp", "daisy",
      "eagle", "flame", "grasp", "honor", "ivory", "joint", "knack", "latch", "mango",
      "noble", "orbit", "proud", "quark", "reign", "snarl", "torch", "unity", "vigor",
      "whisk", "xeric", "yeast", "zephy", "aroma", "blink", "cabin", "diver", "elite",
      "flute", "giddy", "hoist", "input", "jazzy", "kiosk", "lodge", "moist", "nerve",
      "opine", "pouch", "risky", "swoop", "trend", "usher", "viper", "wheat", "xylem",
      "yokel", "zesty"
    ]
    ,
    medium: [
      "abandon", "ability", "absence", "academy", "account", "accused", "achieve", "acquire",
      "actress", "address", "adviser", "against", "airline", "alcohol", "alleged", "already",
      "amazing", "analyze", "ancient", "another", "anxiety", "anybody", "apology", "applied",
      "arrange", "arrival", "article", "artwork", "ashamed", "athlete", "attempt", "attract",
      "auction", "average", "aviator", "awesome", "balance", "barrier", "battery", "because",
      "bedroom", "believe", "benefit", "besides", "between", "bicycle", "bizarre", "blanket",
      "blessed", "blossom", "boiling", "bombing", "booking", "brother", "builder", "cabinet",
      "capture", "careful", "carrier", "central", "ceramic", "chamber", "channel", "charity",
      "chicken", "circuit", "clarify", "classic", "climate", "closure", "collect", "college",
      "comfort", "command", "compact", "compare", "compete", "complex", "compose", "concept",
      "concern", "concert", "conduct", "connect", "consent", "contest", "context", "control",
      "convert", "cooking", "correct", "costume", "council", "country", "craving", "creator",
      "crimson", "current", "curtain", "cyclone", "daytime", "declare", "decline", "defense",
      "density", "deposit", "descend", "desktop", "diamond", "dilemma", "discuss", "distant",
      "diverse", "drawing", "dynamic", "earring", "ecology", "economy", "edition", "elastic",
      "elegant", "element", "embrace", "emotion", "empathy", "endless", "enforce", "enhance",
      "episode", "equator", "essence", "eternal", "evening", "evident", "exactly", "excited",
      "exclude", "exhibit", "explore", "exposed", "express", "factory", "fantasy", "fashion",
      "feature", "festival", "fiction", "fighter", "flaming", "flexible", "foreign", "forever",
      "fortune", "freedom", "freight", "friendly", "further", "gallery", "general", "genetic",
      "genuine", "gesture", "glacier", "grammar", "graphic", "habitat", "harmony", "harvest",
      "healthy", "hearing", "heritage", "history", "holiday", "hopeful", "horizon", "hostile",
      "hundred", "hygiene", "illegal", "illusion", "imagine", "immense", "impress", "include",
      "inspire", "instant", "intense", "involve", "isolate", "january", "journey", "justice",
      "kitchen", "landing", "largest", "leisure", "library", "lighter", "limited", "machine",
      "magical", "magnify", "manager", "married", "massive", "maximum", "meaning", "medical",
      "mention", "midnight", "minimal", "missing", "mixture", "moment", "morning", "musical",
      "mystery", "natural", "neutral", "nominee", "nuclear", "nursery", "observe", "officer",
      "opinion", "optical", "organic", "outcome", "outline", "outlook", "outside", "overall"
    ]
    ,
    hard: [
      "abandonment", "absurdities", "abundantly", "acclamation", "accustomedly", "adaptability", "admirations",
      "adversarial", "affectionate", "aforethought", "allegiances", "altruism", "amazingness", "ambitiously",
      "amusement", "anecdotally", "annoyingly", "anonymously", "anticipatory", "apocalyptical", "appallingly",
      "appreciable", "arbitration", "arrogations", "articulately", "aspirations", "atmospherics", "attentiveness",
      "attractively", "authenticity", "automobiles", "avalanche", "backtracking", "bargainings", "beastliness",
      "begrudgingly", "bestselling", "bewilderment", "bittersweet", "blasphemously", "bloodthirsty", "blueprinting",
      "boisterously", "breakthrough", "brilliantly", "calamitously", "captivation", "carefreeness", "catastrophic",
      "celebrations", "centennials", "challengers", "chandeliers", "charismatics", "checkmating", "cherishable",
      "chronologies", "civilization", "clandestinely", "clarification", "coincidental", "collapsibles", "commanders",
      "commendation", "companionship", "compassionate", "competitively", "complications", "compromisers", "concealment",
      "conclusively", "conscientious", "consensually", "contaminants", "contentiously", "continuities", "conundrums",
      "convictions", "cooperatives", "corruptions", "counteracting", "courteously", "credentialed", "crocodilian",
      "cumulatively", "curiousness", "dangerously", "darkening", "decisiveness", "defensively", "deliberation",
      "delightfully", "delusiveness", "demolishment", "dependability", "depressions", "desperations", "destinies",
      "determinations", "devastatingly", "diagnostician", "diabolically", "diligently", "diminishing", "disastrously",
      "discoverable", "dishonorable", "disobedience", "disruptively", "distinctively", "distortions", "divergences",
      "dominantly", "dramaticness", "duplications", "earthquakes", "elaborations", "embarrassment", "enchantments",
      "endeavoring", "endurability", "enormousness", "enrichments", "enterprising", "entourages", "enviousness",
      "ephemeralness", "epiphanies", "equilibrated", "escalation", "especially", "essentialism", "evaporations",
      "eventfulness", "evolutions", "exaggerating", "excellencies", "exceptions", "excitements", "exclusivities",
      "executorship", "exorbitantly", "expansionist", "experiential", "explosively", "expressively", "extravaganza",
      "fabrications", "fascination", "fatalistics", "ferociously", "fluctuating", "forebodings", "foreshadowing",
      "formidability", "fortunateness", "frighteningly", "friendliness", "fundamental", "generational", "glisteningly",
      "glorification", "gratefulness", "grievances", "groundbreaking", "hallucinatory", "harassingly", "harmonization",
      "headstrongly", "heartfeltness", "hesitancies", "historically", "hospitalities", "humanitarianism", "humiliations",
      "hypnotizable", "idealization", "identifiable", "illogicality", "illusionists", "illustrations", "imitations",
      "impeccability", "implementations", "impracticality", "impulsiveness", "inadequately", "incapacitation", "inceptions",
      "incredibility", "indulgently", "inevitability", "influencers", "innovatively", "insatiability", "integrally",
      "intensifiers", "intricacies", "invaluability", "irresistibly", "jeopardizing", "juxtapositions", "labyrinthian",
      "lamentations", "leaderships", "lingerings", "loyalty", "luxuriousness", "magnificently", "maliciousness",
      "marvelousness", "masterminded", "meddlesomeness", "melancholically", "metaphorical", "miraculously", "momentously",
      "motivational", "mysteriously", "narratively", "necessitously", "nefariously", "nightmarishly", "nostalgically",
      "notoriously", "obliviousness", "observational", "obsessiveness", "omnipotence", "oppressively", "overwhelmingly",
      "paranormality", "perseverance", "phenomenally", "poignancies", "pollutants", "predatorial", "prevalences",
      "prodigiously", "prolongations", "proximity", "reclusiveness", "refinements", "reinforcements", "relentlessness",
      "resiliently", "resourcefulness", "retaliations", "revelations", "ruthlessness", "sabotagings", "salvageable",
      "sanctuaries", "sarcastically", "scandalously", "scripturally", "seductively", "sensational", "sentimentalism",
      "serendipitously", "shattering", "shrewdnesses", "significance", "skepticalness", "spectaculars", "splendidness"
    ]
    ,
    special: [
      "juxtaposition", "antidisestablishmentarianism", "supercalifragilisticexpialidocious",
      "incomprehensibilities", "hippopotomonstrosesquipedaliophobia", "floccinaucinihilipilification",
      "pneumonoultramicroscopicsilicovolcanoconiosis", "sesquipedalian", "uncharacteristically",
      "misunderstanding", "unintelligibility", "disproportionate", "unconstitutional",
      "counterproductive", "oversimplification", "unbelievability", "indistinguishable",
      "extraterrestrial", "discombobulated", "anachronistically", "circumlocution", "interdisciplinary",
      "unimaginatively", "monopolistically", "nonconsequential", "misapprehension", "unpronounceable",
      "superconductivity", "miscommunication", "idiosyncratically", "irreconcilable",
      "unrecognizability", "extravagantness", "counterintuitive", "prestidigitation", "unquantifiable",
      "hyperventilation", "nontransferable", "metamorphosizing", "reverberation", "hallucinogenic",
      "perspicaciously", "counterargument", "overcompensating", "hypersensitivity", "institutionalization",
      "indiscriminately", "incontrovertible", "magnanimousness", "microorganisms", "uncontrollability",
      "inconsequentially", "overachievement", "dissatisfaction", "misinterpretation", "grandiloquence",
      "disenfranchisement", "insurmountability", "malfunctioning", "exemplification", "inexhaustibility",
      "autobiographical", "extracurricular", "hyperbolically", "superstitiously", "preposterously",
      "indecipherability", "reconstructable", "prognostication", "thermodynamically", "demographically",
      "reprehensibility", "uncooperatively", "microarchitecture", "self-actualization", "procrastination",
      "malnourishment", "uncontaminated", "pseudo-intellectual", "philosophizing", "unmistakable",
      "pseudonymously", "indispensability", "disestablishment", "ultramicroscopic", "mispronunciation",
      "photosensitivity", "obstructionism", "electroencephalograph", "counterrevolutionary",
      "misappreciation", "nonreciprocating", "subterraneously", "unidirectional", "disentanglement",
      "philosophically", "unenthusiastically", "dichotomization", "misconstrued", "prequalification",
      "conceptualization", "overgeneralizing", "unconventionality", "infallibility"
    ]
    ,
  };
  
  export default wordsDatabase;
  