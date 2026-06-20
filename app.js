// ─────────────────────────────────────────────────────────────────────────────
// Configuration
// ─────────────────────────────────────────────────────────────────────────────
const ANTHROPIC_API_KEY = 'YOUR_API_KEY_HERE';

// ─────────────────────────────────────────────────────────────────────────────
// Piece unicode map
// ─────────────────────────────────────────────────────────────────────────────
const PIECES = {
  wK: '♔', wQ: '♕', wR: '♖', wB: '♗', wN: '♘', wP: '♙',
  bK: '♚', bQ: '♛', bR: '♜', bB: '♝', bN: '♞', bP: '♟',
};

const FILE_NAMES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

// ─────────────────────────────────────────────────────────────────────────────
// Openings Database  (22 openings)
// ─────────────────────────────────────────────────────────────────────────────
const openingsDatabase = [
  // ── 1.e4 ────────────────────────────────────────────────────────────────────
  {
    id: 'ruy-lopez', name_he: 'רואי לופז', name_en: 'Ruy Lopez', category: 'king',
    moves: ['e2e4','e7e5','g1f3','b8c6','f1b5'],
    description_he: 'אחת הפתיחות העתיקות והנחקרות ביותר. הלבן לוחץ על מגן e5 תוך תקיפת הסוס ב-c6.',
    move_explanations_he: [
      'שליטה במרכז, פתיחת דרך לרץ ולמלכה',
      'תגובה סימטרית — שליטה מרכזית',
      'פיתוח הסוס עם איום על רגלי e5',
      'הגנה על e5 עם הסוס',
      'הרץ תוקף את מגן הרגלי — לחץ עקיף על e5',
    ],
    move_data: [
      {
        move: 'e2e4',
        explanation_he: 'הלבן שולט במרכז ופותח קווים לרץ ולמלכה.',
        why_good: 'e4 שולט ב-d5 ו-f5 ומאפשר פיתוח מהיר של כל הכלים. זהו המהלך הפופולרי ביותר בשחמט.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [
          { move: 'c7c5', explanation_he: 'הסיציליאנית — הגנה אסימטרית שיוצרת מאבק עמוק ומסובך.', quality: 'ok' },
          { move: 'e7e6', explanation_he: 'הצרפתית — מוצקה ושיטתית, אך הרץ c8 עלול להישאר פסיבי.', quality: 'ok' },
          { move: 'c7c6', explanation_he: 'קארו-קאן — הגנה עמידה מאוד, שומרת על מבנה בריא.', quality: 'ok' },
        ],
      },
      {
        move: 'e7e5',
        explanation_he: 'השחור תופס שוויון מרכזי — תגובה סימטרית קלאסית.',
        why_good: 'e5 מונע מהלבן שליטה מוחלטת במרכז ומכין פיתוח מהיר לשני הצדדים.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [],
      },
      {
        move: 'g1f3',
        explanation_he: 'הסוס מתפתח ומאיים על רגלי e5 של השחור.',
        why_good: 'Nf3 הוא המהלך הטוב ביותר — מפתח כלי חשוב, לוחץ על e5, ומכין הצרחה קצרה.',
        common_mistakes_he: 'טעות נפוצה: f4 (גמבי המלך) — אגרסיבי מדי בשלב זה ומחליש את עמדת הלבן.',
        alternative_moves: [
          { move: 'f2f4', verdict: 'risky', note_he: 'גמבי המלך — רומנטי אך לא מומלץ ברמות גבוהות' },
          { move: 'd2d4', verdict: 'ok', note_he: 'אפשרי, מוביל לקו מרכזי שונה' },
        ],
        opponent_alternatives: [
          { move: 'b8c6', explanation_he: 'התגובה הנפוצה ביותר — מגנה על e5 ומפתחת כלי חשוב.', quality: 'main' },
          { move: 'g8f6', explanation_he: 'פטרוף — גמבי חריף שמציע את e5 תמורת יוזמה.', quality: 'ok' },
          { move: 'd7d6', explanation_he: 'פיליידור — שמרני, מגן על e5 ישירות אבל פסיבי יחסית.', quality: 'ok' },
        ],
      },
      {
        move: 'b8c6',
        explanation_he: 'הסוס מגן על e5 ומתפתח לשדה פעיל בו-זמנית.',
        why_good: 'Nc6 הוא המהלך הטבעי — מגן, מפתח, ומשאיר גמישות רבה לשחור.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [],
      },
      {
        move: 'f1b5',
        explanation_he: 'הרץ לוחץ על מגן e5 — זה לב הרעיון של רואי לופז.',
        why_good: 'Bb5 יוצר לחץ עקיף על e5 דרך תקיפת Nc6. הלבן מכין הצרחה מהירה ושומר על גמישות.',
        common_mistakes_he: 'טעות נפוצה: לחשוב שהרץ אוכל את הסוס מיד — בד"כ לא כדאי בשלב זה.',
        alternative_moves: [
          { move: 'f1c4', verdict: 'ok', note_he: 'הפתיחה האיטלקית — אלטרנטיבה מצוינת, סגנון שונה לחלוטין' },
          { move: 'd2d4', verdict: 'risky', note_he: 'פחות מדויק כאן — שחור יוכל להשיג שוויון בקלות' },
        ],
        opponent_alternatives: [
          { move: 'a7a6', explanation_he: 'הסרביאנית — שחור אוכף החלטה מה לעשות עם הרץ.', quality: 'ok' },
          { move: 'g8f6', explanation_he: 'ברלין — הגנה מוצקה מאוד, אחת הפופולריות ביותר בשחמט המקצועי.', quality: 'ok' },
        ],
      },
    ],
    variations: [
      { name_he: 'ברלין', name_en: 'Berlin',
        moves: ['e2e4','e7e5','g1f3','b8c6','f1b5','g8f6'],
        explanations: ['שליטה במרכז','תגובה סימטרית','פיתוח הסוס','הגנה על e5','הרץ לוחץ','פיתוח הסוס — וריאציית ברלין'] },
      { name_he: 'סגורה', name_en: 'Closed',
        moves: ['e2e4','e7e5','g1f3','b8c6','f1b5','a7a6','b5a4','g8f6'],
        explanations: ['שליטה במרכז','תגובה סימטרית','פיתוח הסוס','הגנה על e5','הרץ לוחץ','אילוץ ההחלטה','שמירת הרץ','פיתוח הסוס'] },
    ],
  },
  {
    id: 'italian', name_he: 'פתיחה איטלקית', name_en: 'Italian Game', category: 'king',
    moves: ['e2e4','e7e5','g1f3','b8c6','f1c4'],
    description_he: 'פתיחה קלאסית עם פיתוח מהיר. הרץ מכוון לנקודה f7 הרגישה של השחור.',
    move_explanations_he: [
      'שליטה במרכז',
      'תגובה סימטרית',
      'פיתוח הסוס עם לחץ על e5',
      'הגנה על e5',
      'רץ על האלכסון הפעיל — לחץ על f7',
    ],
    move_data: [
      {
        move: 'e2e4',
        explanation_he: 'שליטה במרכז עם המהלך הנפוץ ביותר.',
        why_good: 'e4 פותח קווים לרץ ולמלכה ושולט בשדות מרכזיים חיוניים.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [
          { move: 'c7c5', explanation_he: 'הסיציליאנית — הפופולרית ביותר נגד 1.e4.', quality: 'ok' },
          { move: 'e7e6', explanation_he: 'הצרפתית — מוצקה ושיטתית.', quality: 'ok' },
        ],
      },
      {
        move: 'e7e5',
        explanation_he: 'שחור תופס שוויון מרכזי קלאסי.',
        why_good: 'e5 מונע מהלבן שליטה מוחלטת ומכין פיתוח מהיר.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [],
      },
      {
        move: 'g1f3',
        explanation_he: 'פיתוח הסוס עם לחץ על e5.',
        why_good: 'Nf3 מכין הצרחה ויוצר לחץ ישיר על e5 של השחור.',
        common_mistakes_he: null,
        alternative_moves: [{ move: 'f2f4', verdict: 'risky', note_he: 'גמבי המלך — פחות מתאים לקו האיטלקי' }],
        opponent_alternatives: [
          { move: 'b8c6', explanation_he: 'ההגנה הנפוצה ביותר — מגנה ומפתחת.', quality: 'main' },
          { move: 'g8f6', explanation_he: 'פטרוף — חריף ומסוכן לשני הצדדים.', quality: 'ok' },
        ],
      },
      {
        move: 'b8c6',
        explanation_he: 'הגנה ופיתוח בו-זמנית.',
        why_good: 'Nc6 מגן על e5 ומפתח כלי חשוב לשדה טוב.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [],
      },
      {
        move: 'f1c4',
        explanation_he: 'הרץ מכוון לאלכסון הפעיל ומאיים על f7.',
        why_good: 'Bc4 מפתח את הרץ לשדה המיטבי ומאיים על f7, הנקודה הרגישה של השחור. גם מכין הצרחה.',
        common_mistakes_he: 'אל תמהרו לשחק Ng5 אחרי זה — זה אגרסיבי מדי וניתן לסלק עם d5.',
        alternative_moves: [
          { move: 'f1b5', verdict: 'ok', note_he: 'רואי לופז — לחץ עמוק יותר, סגנון שונה' },
          { move: 'd2d4', verdict: 'ok', note_he: 'גם אפשרי, מרכזי יותר' },
        ],
        opponent_alternatives: [
          { move: 'f8c5', explanation_he: 'האיטלקית הקלאסית — שחור מכוון לשדה פעיל גם כן.', quality: 'ok' },
          { move: 'g8f6', explanation_he: 'שני הסוסים — שחור לוחץ על e4 ומחפש יוזמה.', quality: 'ok' },
        ],
      },
    ],
    variations: [],
  },
  {
    id: 'four-knights', name_he: 'ארבעת הפרשים', name_en: 'Four Knights Game', category: 'king',
    moves: ['e2e4','e7e5','g1f3','b8c6','b1c3','g8f6'],
    description_he: 'פתיחה סימטרית. שני הצדדים מפתחים את שני הסוסים לפני כל כלי אחר.',
    move_explanations_he: [
      'שליטה במרכז',
      'תגובה סימטרית',
      'פיתוח הסוס',
      'פיתוח סימטרי',
      'פיתוח הסוס השני',
      'ארבעת הפרשים בשטח!',
    ],
    variations: [],
  },
  {
    id: 'kings-gambit', name_he: 'גמבי המלך', name_en: "King's Gambit", category: 'king',
    moves: ['e2e4','e7e5','f2f4'],
    description_he: 'פתיחה רומנטית ואגרסיבית. הלבן מוותר על רגלי f4 כדי לפתוח קו f ולהשיג יוזמה.',
    move_explanations_he: [
      'שליטה במרכז',
      'תגובה מרכזית',
      'הצעת גמבי — פתיחת קו f לתקיפה',
    ],
    variations: [],
  },
  {
    id: 'philidor', name_he: 'הגנת פיליידור', name_en: 'Philidor Defense', category: 'king',
    moves: ['e2e4','e7e5','g1f3','d7d6'],
    description_he: 'הגנה שמרנית. השחור בונה מרכז גמיש ואינו ממהר לפיתוח.',
    move_explanations_he: [
      'שליטה במרכז',
      'תפיסת המרכז',
      'פיתוח הסוס',
      'הגנה על e5 — הגנה שמרנית',
    ],
    variations: [],
  },
  {
    id: 'sicilian', name_he: 'הגנה סיציליאנית', name_en: 'Sicilian Defense', category: 'king',
    moves: ['e2e4','c7c5','g1f3','d7d6','d2d4','c5d4','f3d4'],
    description_he: 'ההגנה הפופולרית ביותר נגד 1.e4. לחץ אסימטרי על המרכז — שחור נלחם על שוויון בדרכים שונות.',
    move_explanations_he: [
      'שליטה במרכז',
      'לחץ אסימטרי על d4 מצד c',
      'פיתוח מהיר ושמירת גמישות',
      'תמיכת e5 עתידי, שמירת מרכז',
      'פתיחת המרכז — לבן מאתגר',
      'לכידת רגלי המרכז',
      'הסוס שולט במרכז',
    ],
    move_data: [
      {
        move: 'e2e4',
        explanation_he: 'הלבן שולט במרכז עם המהלך החזק ביותר.',
        why_good: 'e4 פותח קווים לכלים ומאפשר שליטה מרכזית — בסיס לרוב הפתיחות הפופולריות.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [
          { move: 'e7e5', explanation_he: 'e5 — פתיחות פתוחות קלאסיות, סימטריה.', quality: 'ok' },
          { move: 'e7e6', explanation_he: 'הצרפתית — הגנה מוצקה ושיטתית.', quality: 'ok' },
          { move: 'c7c6', explanation_he: 'קארו-קאן — הגנה עמידה מאוד.', quality: 'ok' },
        ],
      },
      {
        move: 'c7c5',
        explanation_he: 'זה הלב של הסיציליאנית — לחץ על d4 מהצד, יצירת אסימטריה.',
        why_good: 'c5 לוחץ על d4 מבלי לבנות מרכז שניתן לתקוף ישירות. זהו ההגנה הפופולרית ביותר נגד 1.e4.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [],
      },
      {
        move: 'g1f3',
        explanation_he: 'הלבן מפתח הסוס ומכין d4 תוך שמירת גמישות.',
        why_good: 'Nf3 מכין d4 ושומר על כל האפשרויות — הלבן ממתין לראות איזה וריאציה השחור יבחר.',
        common_mistakes_he: 'אל תמהרו ל-d4 לפני Nf3 — הסדר הזה חשוב!',
        alternative_moves: [
          { move: 'b1c3', verdict: 'ok', note_he: 'סיציליאנית סגורה — שונה לחלוטין בסגנון' },
        ],
        opponent_alternatives: [
          { move: 'd7d6', explanation_he: 'ההכנה לנייגי/דרקון — הנפוצה ביותר.', quality: 'main' },
          { move: 'b8c6', explanation_he: 'כנגד Nf3 — מוביל לסיציליאנית קלאסית.', quality: 'ok' },
          { move: 'e7e6', explanation_he: 'שבניינגן — גמישה ומוצקה, מכינה e5.', quality: 'ok' },
        ],
      },
      {
        move: 'd7d6',
        explanation_he: 'שחור מכין e5 ו-Nf6 ומשאיר גמישות לבחור וריאציה.',
        why_good: 'd6 תומך ב-e5 בעתיד ומכין פיתוח הסוס ל-f6. הבסיס לנייגי ולדרקון.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [],
      },
      {
        move: 'd2d4',
        explanation_he: 'הלבן פותח את המרכז — הרגע המרכזי של הסיציליאנית!',
        why_good: 'd4 הוא המהלך שהלבן כמה לשחק. פתיחת המרכז מעניקה יתרון מרחבי ויוזמה.',
        common_mistakes_he: 'אם לא שיחקתם Nf3 קודם, d4 הייתה פחות אפקטיבית.',
        alternative_moves: [{ move: 'f2f4', verdict: 'ok', note_he: 'גרנד-פרייס — אגרסיבי ומעניין' }],
        opponent_alternatives: [
          { move: 'c5d4', explanation_he: 'שחור חייב לאכול — זוהי הנקודה של כל הוריאציה.', quality: 'main' },
        ],
      },
      {
        move: 'c5d4',
        explanation_he: 'שחור לוכד את רגלי המרכז — חובה בסיציליאנית.',
        why_good: 'אכילה עם c יוצרת עמודת c פתוחה שתשמש את השחור לפעילות עתידית.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [],
      },
      {
        move: 'f3d4',
        explanation_he: 'הסוס לוכד חזרה ושולט במרכז.',
        why_good: 'Nxd4 שולט בשדה d4 ופותח קו לרץ f1. ללבן יתרון מרחבי, לשחור יוזמה בקו c.',
        common_mistakes_he: null,
        alternative_moves: [{ move: 'd1d4', verdict: 'risky', note_he: 'לכידה עם המלכה — אפשרית אך חושפת אותה' }],
        opponent_alternatives: [
          { move: 'g8f6', explanation_he: 'נייגי — Nf6 ואחר כך a6.', quality: 'ok' },
          { move: 'a7a6', explanation_he: 'נייגי מיד — גם אפשרי.', quality: 'ok' },
        ],
      },
    ],
    variations: [
      { name_he: 'נייגי', name_en: 'Najdorf',
        moves: ['e2e4','c7c5','g1f3','d7d6','d2d4','c5d4','f3d4','g8f6','b1c3','a7a6'],
        explanations: ['שליטה במרכז','לחץ צדדי','פיתוח','תמיכת מרכז','פתיחת מרכז','לכידה','שליטה','פיתוח הסוס','פיתוח הסוס הגדול','מניעת Nb5 + תכנית b5'] },
      { name_he: 'דרקון', name_en: 'Dragon',
        moves: ['e2e4','c7c5','g1f3','d7d6','d2d4','c5d4','f3d4','g8f6','b1c3','g7g6'],
        explanations: ['שליטה במרכז','לחץ צדדי','פיתוח','תמיכת מרכז','פתיחת מרכז','לכידה','שליטה','פיתוח הסוס','פיתוח הסוס הגדול','הכנת רץ הדרקון ב-g7'] },
    ],
  },
  {
    id: 'french', name_he: 'הגנה צרפתית', name_en: 'French Defense', category: 'king',
    moves: ['e2e4','e7e6','d2d4','d7d5'],
    description_he: 'הגנה מוצקה ושיטתית. השחור בונה מרכז רגלים חזק אך הרץ ב-c8 עלול להישאר פסיבי.',
    move_explanations_he: [
      'שליטה במרכז',
      'תמיכת d5 עתידי מאחור',
      'חיזוק המרכז',
      'אתגר מרכזי — שחור נלחם על d4',
    ],
    move_data: [
      {
        move: 'e2e4',
        explanation_he: 'שליטה במרכז.',
        why_good: 'e4 פותח קווים לכלים ושולט במרכז.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [
          { move: 'e7e5', explanation_he: 'פתיחות פתוחות — הקלאסי.', quality: 'ok' },
          { move: 'c7c5', explanation_he: 'הסיציליאנית — הפופולרית ביותר.', quality: 'ok' },
        ],
      },
      {
        move: 'e7e6',
        explanation_he: 'שחור מכין d5 מהשורה השנייה — זה לב הצרפתית.',
        why_good: 'e6 תומך ב-d5 ומכין מרכז רגלים מוצק. המחיר: הרץ c8 יהיה פסיבי בתחילה.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [],
      },
      {
        move: 'd2d4',
        explanation_he: 'הלבן בונה מרכז חזק.',
        why_good: 'd4 יחד עם e4 יוצר מרכז רגלים פעיל. הלבן מנסה להוכיח יתרון מרחבי.',
        common_mistakes_he: null,
        alternative_moves: [
          { move: 'd2d3', verdict: 'risky', note_he: 'צרפתית קינג — פחות תחרותי, שחור ישיג שוויון בקלות' },
        ],
        opponent_alternatives: [
          { move: 'd7d5', explanation_he: 'האתגר המרכזי — כל הצרפתית עוסקת בזה!', quality: 'main' },
          { move: 'g8f6', explanation_he: 'Nf6 — נסיון לסבך עם Ng4 בהמשך.', quality: 'ok' },
        ],
      },
      {
        move: 'd7d5',
        explanation_he: 'שחור מאתגר את המרכז ישירות — הרגע המרכזי בצרפתית!',
        why_good: 'd5 לוחץ על e4 ויוצר מתח. שחור בונה מרכז רגלים עמיד ומוצק.',
        common_mistakes_he: 'אל תתמהמהו עם d5 — זה מהלך חובה בצרפתית.',
        alternative_moves: [
          { move: 'c7c5', verdict: 'ok', note_he: 'גם אפשרי — לוחץ על d4 מהצד' },
        ],
        opponent_alternatives: [],
      },
    ],
    variations: [],
  },
  {
    id: 'caro-kann', name_he: 'הגנה קארו-קאן', name_en: 'Caro-Kann Defense', category: 'king',
    moves: ['e2e4','c7c6','d2d4','d7d5'],
    description_he: 'הגנה מוצקה ועמידה. השחור תומך ב-d5 בעזרת c6 ושומר על רץ c8 פעיל יותר מהצרפתית.',
    move_explanations_he: [
      'שליטה במרכז',
      'הכנה ל-d5 עם תמיכה',
      'חיזוק המרכז',
      'כיבוש המרכז — מבוסס יותר מהצרפתית',
    ],
    variations: [],
  },
  {
    id: 'scandinavian', name_he: 'הגנה סקנדינבית', name_en: 'Scandinavian Defense', category: 'king',
    moves: ['e2e4','d7d5','e4d5','d8d5','b1c3'],
    description_he: 'תגובה מיידית ולא שגרתית. השחור מאתגר את המרכז, לוכד את הרגלי ומגלה את המלכה.',
    move_explanations_he: [
      'שליטה במרכז',
      'אתגר מיידי למרכז',
      'לכידת הרגלי המרכז',
      'שחזור הרגלי — המלכה יוצאת מוקדם',
      'פיתוח הסוס עם גירוש המלכה',
    ],
    variations: [],
  },
  {
    id: 'pirc', name_he: 'הגנת פירץ', name_en: 'Pirc Defense', category: 'king',
    moves: ['e2e4','d7d6','d2d4','g8f6','b1c3','g7g6'],
    description_he: 'הגנה היפר-מודרנית. השחור מניח ללבן לבנות מרכז ומאתגר אותו בעזרת כוחות פעילים.',
    move_explanations_he: [
      'שליטה במרכז',
      'הכנה לפיחות ב-g7',
      'חיזוק המרכז',
      'פיתוח הסוס',
      'שליטה מרכזית',
      'הכנה לרץ ממולל ב-g7',
    ],
    variations: [],
  },
  // ── 1.d4 ────────────────────────────────────────────────────────────────────
  {
    id: 'queens-gambit-declined', name_he: 'גמבי המלכה — דחוי', name_en: "Queen's Gambit Declined", category: 'queen',
    moves: ['d2d4','d7d5','c2c4','e7e6','b1c3','g8f6'],
    description_he: 'הגנה קלאסית ומוצקה. השחור דוחה את הגמבי ושומר על מרכז בריא.',
    move_explanations_he: [
      'שליטה במרכז בצד המלכה',
      'תפיסת המרכז',
      'הצעת גמבי — לחץ על d5',
      'דחיית הגמבי — הגנה על d5 מהצד',
      'פיתוח הסוס הגדול',
      'פיתוח הסוס — פיתוח קלאסי',
    ],
    move_data: [
      {
        move: 'd2d4',
        explanation_he: 'הלבן שולט במרכז בצד המלכה.',
        why_good: 'd4 פותח קווים לרץ c1 ולמלכה ושולט בשדות מרכזיים חשובים.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [
          { move: 'd7d5', explanation_he: 'תגובה סימטרית — הנפוצה ביותר.', quality: 'main' },
          { move: 'g8f6', explanation_he: 'הינדיות שונות — King\'s Indian, Nimzo, Queen\'s Indian.', quality: 'ok' },
          { move: 'f7f5', explanation_he: 'הולנדית — אגרסיבית, שולטת ב-e4.', quality: 'ok' },
        ],
      },
      {
        move: 'd7d5',
        explanation_he: 'שחור תופס שוויון מרכזי.',
        why_good: 'd5 שולט ב-c4 ו-e4 ויוצר מבנה סימטרי מוצק.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [],
      },
      {
        move: 'c2c4',
        explanation_he: 'הצעת גמבי המלכה — לחץ על d5.',
        why_good: 'c4 לוחץ על d5 ומציע ויתור זמני. מהלך חכם שמאתגר את שליטת השחור במרכז.',
        common_mistakes_he: null,
        alternative_moves: [
          { move: 'g1f3', verdict: 'ok', note_he: 'גם טוב — גמיש יותר בסדר המהלכים' },
        ],
        opponent_alternatives: [
          { move: 'd5c4', explanation_he: 'QGA — שחור לוכח, לבן מחזיר עם יתרון פיתוח.', quality: 'ok' },
          { move: 'e7e6', explanation_he: 'QGD — הדחייה הקלאסית ומוצקה.', quality: 'main' },
          { move: 'c7c6', explanation_he: 'הסלאבית — גמישה, שומרת את פיתוח c8.', quality: 'ok' },
        ],
      },
      {
        move: 'e7e6',
        explanation_he: 'שחור דוחה את הגמבי ובונה מרכז מוצק.',
        why_good: 'e6 מגן על d5 ומכין פיתוח הרץ f8. שחור שומר על מבנה בריא.',
        common_mistakes_he: 'אל תאכלו ב-c4 כאן — זה יאפשר ללבן יתרון מרכזי משמעותי.',
        alternative_moves: [
          { move: 'd5c4', verdict: 'ok', note_he: 'QGA — שחור לוכח, לבן מחזיר, מעניין' },
          { move: 'c7c6', verdict: 'ok', note_he: 'הסלאבית — גמישה ופופולרית' },
        ],
        opponent_alternatives: [],
      },
      {
        move: 'b1c3',
        explanation_he: 'הלבן מפתח סוס גדול ומחזק את הלחץ על d5.',
        why_good: 'Nc3 מגן על c4 ולוחץ על d5. מכין e4 בהמשך ופיתוח כלים נוסף.',
        common_mistakes_he: null,
        alternative_moves: [
          { move: 'g1f3', verdict: 'ok', note_he: 'גם אפשרי, סדר מהלכים שונה' },
        ],
        opponent_alternatives: [
          { move: 'g8f6', explanation_he: 'הנפוץ ביותר — מפתח ולוחץ על e4.', quality: 'main' },
          { move: 'f8b4', explanation_he: 'נימצו-הודית — מצמד את הסוס b1.', quality: 'ok' },
        ],
      },
      {
        move: 'g8f6',
        explanation_he: 'שחור מפתח הסוס ולוחץ על e4.',
        why_good: 'Nf6 הוא המהלך הטבעי ביותר — מפתח, לוחץ, ומכין הצרחה.',
        common_mistakes_he: null,
        alternative_moves: [],
        opponent_alternatives: [],
      },
    ],
    variations: [],
  },
  {
    id: 'queens-gambit-accepted', name_he: 'גמבי המלכה — מוחל', name_en: "Queen's Gambit Accepted", category: 'queen',
    moves: ['d2d4','d7d5','c2c4','d5c4','g1f3'],
    description_he: 'השחור לוכד את הגמבי. הלבן קונה מרכז ויוזמה בפיתוח בתמורה לרגלי.',
    move_explanations_he: [
      'שליטה במרכז',
      'תפיסת המרכז',
      'הצעת גמבי',
      'קבלת הגמבי — לכידת הרגלי',
      'פיתוח הסוס — לבן ישחזר את הגמבי',
    ],
    variations: [],
  },
  {
    id: 'slav', name_he: 'הגנה סלאבית', name_en: 'Slav Defense', category: 'queen',
    moves: ['d2d4','d7d5','c2c4','c7c6'],
    description_he: 'הגנה מוצקה ופופולרית. השחור תומך ב-d5 בעזרת c6 תוך שמירת גמישות לרץ c8.',
    move_explanations_he: [
      'שליטה במרכז',
      'תפיסת המרכז',
      'לחץ על d5',
      'תמיכה ב-d5 — הגנה גמישה',
    ],
    variations: [],
  },
  {
    id: 'kings-indian', name_he: 'הגנה הודית-מלך', name_en: "King's Indian Defense", category: 'queen',
    moves: ['d2d4','g8f6','c2c4','g7g6','b1c3','f8g7','e2e4','d7d6'],
    description_he: 'הגנה דינמית ואגרסיבית. השחור מניח ללבן לבנות מרכז ואז תוקף אותו בעזרת רץ ממולל ב-g7.',
    move_explanations_he: [
      'שליטה במרכז',
      'פיתוח הסוס',
      'פתיחת אלכסון לרץ',
      'הכנה לפיחות',
      'שליטה מרכזית',
      'רץ ממולל — עין ארוכה!',
      'מרכז חזק',
      'שמירת גמישות מרכזית',
    ],
    variations: [],
  },
  {
    id: 'nimzo-indian', name_he: 'הגנה הינדית-נימצו', name_en: 'Nimzo-Indian Defense', category: 'queen',
    moves: ['d2d4','g8f6','c2c4','e7e6','b1c3','f8b4'],
    description_he: 'הגנה תגובתית ופופולרית. השחור מצמד את הרץ לסוס c3 ועוצר את e4.',
    move_explanations_he: [
      'שליטה במרכז',
      'פיתוח הסוס',
      'פתיחת הרץ b',
      'גמישות מרכזית',
      'פיתוח הסוס הגדול',
      'צימוד הסוס — עיכוב e4',
    ],
    variations: [],
  },
  {
    id: 'queens-indian', name_he: 'הגנה הודית-מלכה', name_en: "Queen's Indian Defense", category: 'queen',
    moves: ['d2d4','g8f6','c2c4','e7e6','g1f3','b7b6'],
    description_he: 'הגנה הינדית מתוחכמת. השחור מכין פיחות ב-b7 ושולט באלכסון הגדול.',
    move_explanations_he: [
      'שליטה במרכז',
      'פיתוח הסוס',
      'פתיחת הרץ b',
      'גמישות',
      'פיתוח הסוס — מניעת e4',
      'הכנה לפיחות ב-b7',
    ],
    variations: [],
  },
  {
    id: 'grunfeld', name_he: 'הגנת גרינפלד', name_en: 'Grünfeld Defense', category: 'queen',
    moves: ['d2d4','g8f6','c2c4','g7g6','b1c3','d7d5'],
    description_he: 'הגנה היפר-מודרנית. השחור מניח ללבן לבנות מרכז חזק ואז מאתגר אותו ישירות.',
    move_explanations_he: [
      'שליטה במרכז',
      'פיתוח הסוס',
      'פתיחת אלכסון',
      'הכנה לרץ g7',
      'פיתוח הסוס הגדול',
      'אתגר ישיר למרכז — גרינפלד!',
    ],
    variations: [],
  },
  {
    id: 'dutch', name_he: 'הגנה הולנדית', name_en: 'Dutch Defense', category: 'queen',
    moves: ['d2d4','f7f5'],
    description_he: 'הגנה אגרסיבית ולא סימטרית. השחור שולט מיד ב-e4 ומכין תקיפה על אגף המלך.',
    move_explanations_he: [
      'שליטה במרכז',
      'שליטה ב-e4 — הכנה לתקיפת אגף המלך',
    ],
    variations: [],
  },
  // ── Flank ───────────────────────────────────────────────────────────────────
  {
    id: 'english', name_he: 'פתיחה אנגלית', name_en: 'English Opening', category: 'flank',
    moves: ['c2c4','e7e5','b1c3','g8f6','g1f3'],
    description_he: 'פתיחת צד גמישה. הלבן לוחץ על d5 ועתיד לבנות מרכז, לעתים בסדר מהופך של פתיחות 1.d4.',
    move_explanations_he: [
      'לחץ על d5 ממרחק',
      'תפיסת המרכז',
      'פיתוח הסוס',
      'פיתוח הסוס',
      'פיתוח מהיר — לחץ על e5',
    ],
    variations: [],
  },
  {
    id: 'reti', name_he: 'פתיחת רטי', name_en: 'Réti Opening', category: 'flank',
    moves: ['g1f3','d7d5','c2c4','d5c4'],
    description_he: 'פתיחה היפר-מודרנית. הלבן שולט במרכז מהצד ולא כובש אותו מיד.',
    move_explanations_he: [
      'פיתוח הסוס — לחץ על e5 ו-d4',
      'תפיסת המרכז',
      'לחץ על d5',
      'קבלת הגמבי',
    ],
    variations: [],
  },
  {
    id: 'larsen', name_he: 'פתיחת לארסן', name_en: "Larsen's Opening", category: 'flank',
    moves: ['b2b3','e7e5','c1b2'],
    description_he: 'פתיחה יצירתית. הלבן מכין פיחות ב-b2 ומפעיל לחץ עקיף על המרכז.',
    move_explanations_he: [
      'הכנה לפיחות רץ ב-b2',
      'תפיסת המרכז',
      'הרץ הפעיל — לחץ לאורך האלכסון',
    ],
    variations: [],
  },
  {
    id: 'bird', name_he: 'פתיחת בירד', name_en: "Bird's Opening", category: 'flank',
    moves: ['f2f4','d7d5','g1f3'],
    description_he: 'פתיחה אגרסיבית. הלבן שולט ב-e5 ומכין תקיפה על אגף המלך.',
    move_explanations_he: [
      'שליטה ב-e5, פתיחת קו f',
      'תגובת מרכז',
      'פיתוח הסוס',
    ],
    variations: [],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Square helpers
// ─────────────────────────────────────────────────────────────────────────────
function sq(r, c)       { return r * 8 + c; }
function row(idx)       { return Math.floor(idx / 8); }
function col(idx)       { return idx % 8; }
function sqName(idx)    { return FILE_NAMES[col(idx)] + (8 - row(idx)); }
function nameToIdx(n)   { return (8 - parseInt(n[1])) * 8 + FILE_NAMES.indexOf(n[0]); }
function colorOf(p)     { return p ? p[0] : null; }
function isWhite(p)     { return p && p[0] === 'w'; }
function opponent(c)    { return c === 'w' ? 'b' : 'w'; }

// ─────────────────────────────────────────────────────────────────────────────
// Game state
// ─────────────────────────────────────────────────────────────────────────────
let state = {};

function initState() {
  const board = Array(64).fill(null);
  const backRow = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
  for (let c = 0; c < 8; c++) {
    board[sq(0, c)] = 'b' + backRow[c];
    board[sq(7, c)] = 'w' + backRow[c];
    board[sq(1, c)] = 'bP';
    board[sq(6, c)] = 'wP';
  }

  state = {
    board,
    turn: 'w',
    castling: { wK: true, wQ: true, bK: true, bQ: true },
    enPassant: null,
    halfMoveClock: 0,
    fullMoveNumber: 1,
    history: [],
    positionHistory: [],
    moveListAlg: [],
    capturedByWhite: [],
    capturedByBlack: [],
    selected: null,
    lastMove: null,
    gameOver: false,
    aiVsAiRunning: false,
    aiVsAiMode: false,
  };
  state.positionHistory.push(positionKey(state));
}

// ─────────────────────────────────────────────────────────────────────────────
// Position key & FEN
// ─────────────────────────────────────────────────────────────────────────────
function positionKey(s) {
  const { wK, wQ, bK, bQ } = s.castling;
  return s.board.join(',') + '|' + s.turn + '|' +
    (wK ? 'K' : '') + (wQ ? 'Q' : '') + (bK ? 'k' : '') + (bQ ? 'q' : '') +
    '|' + (s.enPassant !== null ? sqName(s.enPassant) : '-');
}

function toFEN(s) {
  let fen = '';
  for (let r = 0; r < 8; r++) {
    let empty = 0;
    for (let c = 0; c < 8; c++) {
      const p = s.board[sq(r, c)];
      if (!p) {
        empty++;
      } else {
        if (empty) { fen += empty; empty = 0; }
        fen += isWhite(p) ? p[1] : p[1].toLowerCase();
      }
    }
    if (empty) fen += empty;
    if (r < 7) fen += '/';
  }
  const { wK, wQ, bK, bQ } = s.castling;
  const cast = (wK ? 'K' : '') + (wQ ? 'Q' : '') + (bK ? 'k' : '') + (bQ ? 'q' : '') || '-';
  const ep = s.enPassant !== null ? sqName(s.enPassant) : '-';
  return `${fen} ${s.turn === 'w' ? 'w' : 'b'} ${cast} ${ep} ${s.halfMoveClock} ${s.fullMoveNumber}`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Move generation
// ─────────────────────────────────────────────────────────────────────────────
function pseudoMoves(s, color) {
  const moves = [];

  for (let from = 0; from < 64; from++) {
    const p = s.board[from];
    if (!p || colorOf(p) !== color) continue;
    const type = p[1];
    const r = row(from), c = col(from);

    if (type === 'P') {
      const dir = isWhite(p) ? -1 : 1;
      const startRow = isWhite(p) ? 6 : 1;
      const fwd = sq(r + dir, c);
      if (r + dir >= 0 && r + dir < 8 && !s.board[fwd]) {
        moves.push({ from, to: fwd, piece: p });
        if (r === startRow && !s.board[sq(r + 2 * dir, c)]) {
          moves.push({ from, to: sq(r + 2 * dir, c), piece: p, doublePush: true });
        }
      }
      for (const dc of [-1, 1]) {
        if (c + dc < 0 || c + dc > 7) continue;
        const to = sq(r + dir, c + dc);
        if (s.board[to] && colorOf(s.board[to]) !== color) moves.push({ from, to, piece: p });
        if (s.enPassant === to) moves.push({ from, to, piece: p, enPassant: true });
      }

    } else if (type === 'N') {
      for (const [dr, dc] of [[-2,-1],[-2,1],[-1,-2],[-1,2],[1,-2],[1,2],[2,-1],[2,1]]) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr > 7 || nc < 0 || nc > 7) continue;
        const to = sq(nr, nc);
        if (!s.board[to] || colorOf(s.board[to]) !== color) moves.push({ from, to, piece: p });
      }

    } else if (type === 'B' || type === 'R' || type === 'Q') {
      const dirs =
        type === 'B' ? [[-1,-1],[-1,1],[1,-1],[1,1]] :
        type === 'R' ? [[-1,0],[1,0],[0,-1],[0,1]] :
                       [[-1,-1],[-1,1],[1,-1],[1,1],[-1,0],[1,0],[0,-1],[0,1]];
      for (const [dr, dc] of dirs) {
        let nr = r + dr, nc = c + dc;
        while (nr >= 0 && nr < 8 && nc >= 0 && nc < 8) {
          const to = sq(nr, nc);
          if (!s.board[to]) {
            moves.push({ from, to, piece: p });
          } else {
            if (colorOf(s.board[to]) !== color) moves.push({ from, to, piece: p });
            break;
          }
          nr += dr; nc += dc;
        }
      }

    } else if (type === 'K') {
      for (const [dr, dc] of [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]) {
        const nr = r + dr, nc = c + dc;
        if (nr < 0 || nr > 7 || nc < 0 || nc > 7) continue;
        const to = sq(nr, nc);
        if (!s.board[to] || colorOf(s.board[to]) !== color) moves.push({ from, to, piece: p });
      }
      // Castling
      const backR = isWhite(p) ? 7 : 0;
      if (r === backR && c === 4) {
        const ck = isWhite(p) ? s.castling.wK : s.castling.bK;
        const cq = isWhite(p) ? s.castling.wQ : s.castling.bQ;
        if (ck && !s.board[sq(backR,5)] && !s.board[sq(backR,6)])
          moves.push({ from, to: sq(backR, 6), piece: p, castling: 'K' });
        if (cq && !s.board[sq(backR,3)] && !s.board[sq(backR,2)] && !s.board[sq(backR,1)])
          moves.push({ from, to: sq(backR, 2), piece: p, castling: 'Q' });
      }
    }
  }
  return moves;
}

function isInCheck(s, color) {
  let kingIdx = -1;
  for (let i = 0; i < 64; i++) if (s.board[i] === color + 'K') kingIdx = i;
  if (kingIdx < 0) return true;
  return pseudoMoves(s, opponent(color)).some(m => m.to === kingIdx);
}

function squareAttackedBy(s, idx, color) {
  return pseudoMoves(s, color).some(m => m.to === idx);
}

function applyMoveToBoard(board, move, castling) {
  const nb = board.slice();
  const newCastling = { ...castling };
  let newEP = null;
  let captured = null;

  if (nb[move.to]) captured = nb[move.to];

  if (move.enPassant) {
    const capSq = move.to + (isWhite(move.piece) ? 1 : -1) * 8;
    captured = nb[capSq];
    nb[capSq] = null;
  }

  nb[move.to] = move.promotion ? colorOf(move.piece) + move.promotion : move.piece;
  nb[move.from] = null;

  if (move.castling) {
    const r = row(move.from);
    if (move.castling === 'K') { nb[sq(r,5)] = nb[sq(r,7)]; nb[sq(r,7)] = null; }
    else                        { nb[sq(r,3)] = nb[sq(r,0)]; nb[sq(r,0)] = null; }
  }

  // Update castling rights
  if (move.piece === 'wK') { newCastling.wK = false; newCastling.wQ = false; }
  if (move.piece === 'bK') { newCastling.bK = false; newCastling.bQ = false; }
  if (move.piece === 'wR') {
    if (move.from === sq(7,7)) newCastling.wK = false;
    if (move.from === sq(7,0)) newCastling.wQ = false;
  }
  if (move.piece === 'bR') {
    if (move.from === sq(0,7)) newCastling.bK = false;
    if (move.from === sq(0,0)) newCastling.bQ = false;
  }
  if (move.to === sq(7,7)) newCastling.wK = false;
  if (move.to === sq(7,0)) newCastling.wQ = false;
  if (move.to === sq(0,7)) newCastling.bK = false;
  if (move.to === sq(0,0)) newCastling.bQ = false;

  if (move.doublePush) newEP = move.to + (isWhite(move.piece) ? 1 : -1) * 8;

  return { board: nb, castling: newCastling, enPassant: newEP, captured };
}

function legalMoves(s, color) {
  const legal = [];
  for (const m of pseudoMoves(s, color)) {
    if (m.castling) {
      if (isInCheck(s, color)) continue;
      const opp = opponent(color);
      const r = row(m.from);
      const pass = m.castling === 'K' ? [sq(r,5), sq(r,6)] : [sq(r,3), sq(r,2)];
      let safe = true;
      for (const ps of pass) {
        const tmp = s.board.slice();
        tmp[ps] = color + 'K'; tmp[m.from] = null;
        if (squareAttackedBy({ ...s, board: tmp }, ps, opp)) { safe = false; break; }
      }
      if (!safe) continue;
    }
    const res = applyMoveToBoard(s.board, m, s.castling);
    if (!isInCheck({ ...s, board: res.board, castling: res.castling, enPassant: res.enPassant }, color))
      legal.push(m);
  }
  return legal;
}

// ─────────────────────────────────────────────────────────────────────────────
// Algebraic notation
// ─────────────────────────────────────────────────────────────────────────────
function moveToAlgebraic(s, move, legalList) {
  if (move.castling === 'K') return 'O-O';
  if (move.castling === 'Q') return 'O-O-O';

  const type = move.piece[1];
  const toName = sqName(move.to);
  let an = '';

  if (type === 'P') {
    an = (s.board[move.to] || move.enPassant) ? FILE_NAMES[col(move.from)] + 'x' + toName : toName;
    if (move.promotion) an += '=' + move.promotion;
  } else {
    let prefix = type;
    const ambig = legalList.filter(m => m !== move && m.piece === move.piece && m.to === move.to);
    if (ambig.length) {
      if (ambig.every(m => col(m.from) !== col(move.from)))      prefix += FILE_NAMES[col(move.from)];
      else if (ambig.every(m => row(m.from) !== row(move.from))) prefix += (8 - row(move.from));
      else                                                        prefix += sqName(move.from);
    }
    an = prefix + (s.board[move.to] ? 'x' : '') + toName;
  }

  // Check/mate suffix
  const res = applyMoveToBoard(s.board, move, s.castling);
  const ns = { ...s, board: res.board, castling: res.castling, enPassant: res.enPassant, turn: opponent(s.turn) };
  const oLegal = legalMoves(ns, ns.turn);
  if (isInCheck(ns, ns.turn)) an += oLegal.length === 0 ? '#' : '+';
  return an;
}

// ─────────────────────────────────────────────────────────────────────────────
// Execute / undo moves
// ─────────────────────────────────────────────────────────────────────────────
function executeMove(move) {
  const legal = legalMoves(state, state.turn);
  const matched = legal.filter(m =>
    m.from === move.from && m.to === move.to &&
    (m.promotion || null) === (move.promotion || null)
  );
  if (!matched.length) return false;

  const m = matched[0];
  const algStr = moveToAlgebraic(state, m, legal);

  state.history.push({
    board: state.board.slice(),
    castling: { ...state.castling },
    enPassant: state.enPassant,
    halfMoveClock: state.halfMoveClock,
    fullMoveNumber: state.fullMoveNumber,
    capturedByWhite: [...state.capturedByWhite],
    capturedByBlack: [...state.capturedByBlack],
    moveListAlg: [...state.moveListAlg],
    positionHistory: [...state.positionHistory],
    lastMove: state.lastMove,
  });

  const res = applyMoveToBoard(state.board, m, state.castling);

  if (res.captured) {
    if (isWhite(m.piece)) state.capturedByWhite.push(res.captured);
    else                   state.capturedByBlack.push(res.captured);
  }

  state.board        = res.board;
  state.castling     = res.castling;
  state.enPassant    = res.enPassant;
  state.lastMove     = { from: m.from, to: m.to };
  state.halfMoveClock = (m.piece[1] === 'P' || res.captured) ? 0 : state.halfMoveClock + 1;
  if (state.turn === 'b') state.fullMoveNumber++;

  if (state.turn === 'w') {
    state.moveListAlg.push((state.fullMoveNumber - 1) + '. ' + algStr);
  } else {
    const last = state.moveListAlg[state.moveListAlg.length - 1];
    state.moveListAlg[state.moveListAlg.length - 1] = last ? last + ' ' + algStr : '... ' + algStr;
  }

  state.turn = opponent(state.turn);
  state.positionHistory.push(positionKey(state));
  return true;
}

function undoMove() {
  if (!state.history.length) return;
  const snap = state.history.pop();
  Object.assign(state, snap);
  state.turn = opponent(state.turn);
  state.gameOver = false;
}

// ─────────────────────────────────────────────────────────────────────────────
// Game-over detection
// ─────────────────────────────────────────────────────────────────────────────
function checkGameOver() {
  const legal = legalMoves(state, state.turn);
  if (!legal.length) {
    return isInCheck(state, state.turn)
      ? { over: true, reason: 'checkmate', winner: opponent(state.turn) }
      : { over: true, reason: 'stalemate', winner: null };
  }
  if (state.halfMoveClock >= 100) return { over: true, reason: '50-move', winner: null };
  const key = positionKey(state);
  if (state.positionHistory.filter(k => k === key).length >= 3)
    return { over: true, reason: 'repetition', winner: null };
  return { over: false };
}

// ─────────────────────────────────────────────────────────────────────────────
// Stockfish 16 engine
// ─────────────────────────────────────────────────────────────────────────────
let stockfish    = null;
let sfCallback   = null;
let sfPonder     = { active: false, move: null };
let sfPonderNext = null;

function handleStockfishMsg(e) {
  const msg = typeof e.data === 'string' ? e.data : String(e.data || '');
  if (!sfCallback) return;
  const cb = sfCallback;
  sfCallback = null;             // clear before calling so cb can set a new one
  if (!cb(msg)) sfCallback = cb; // restore if not consumed
}

function sfWaitFor(predicate, command) {
  return new Promise(resolve => {
    sfCallback = msg => { if (predicate(msg)) { resolve(); return true; } return false; };
    if (command) stockfish.postMessage(command);
  });
}

async function initStockfish() {
  try {
    document.getElementById('aiLog').textContent = 'Loading Stockfish 16...';
    const SF_CDN = 'https://cdn.jsdelivr.net/npm/stockfish@16.0.0/src/';
    const workerCode = [
      'self.Module = { locateFile: p => "' + SF_CDN + '" + p };',
      'importScripts("' + SF_CDN + 'stockfish-sse.js");',
    ].join('\n');
    stockfish = new Worker(URL.createObjectURL(new Blob([workerCode], { type: 'text/javascript' })));
    stockfish.onmessage = handleStockfishMsg;
    await sfWaitFor(m => m === 'uciok', 'uci');
    stockfish.postMessage('setoption name Ponder value true');
    stockfish.postMessage('setoption name Threads value 4');
    stockfish.postMessage('setoption name Hash value 512');
    await sfWaitFor(m => m === 'readyok', 'isready');
    applyStrength(parseInt(document.getElementById('strengthSlider').value));
    document.getElementById('aiLog').textContent = 'Stockfish 16 ready';
  } catch (err) {
    document.getElementById('aiLog').textContent = 'Engine error: ' + err.message;
    console.error('Stockfish init:', err);
  }
}

function getMoveTime() {
  const elo = parseInt(document.getElementById('strengthSlider').value);
  return Math.round(200 + (elo - 500) / 3000 * 4800);
}

function applyStrength(elo) {
  if (!stockfish) return;
  if (elo >= 3500) {
    stockfish.postMessage('setoption name UCI_LimitStrength value false');
    stockfish.postMessage('setoption name Skill Level value 20');
  } else {
    stockfish.postMessage('setoption name UCI_LimitStrength value true');
    stockfish.postMessage('setoption name UCI_Elo value ' + Math.min(3190, Math.max(1320, elo)));
    if (elo < 1320) {
      stockfish.postMessage('setoption name Skill Level value ' + Math.max(0, Math.round((elo - 500) / 820 * 10)));
    }
  }
}

function getStockfishMove(fen, playerMove) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error('Stockfish timeout')), 60000);

    const onBestmove = msg => {
      if (!msg.startsWith('bestmove')) return false;
      clearTimeout(timer);
      const parts = msg.split(' ');
      sfPonderNext = (parts[2] === 'ponder' && parts[3]) ? parts[3] : null;
      resolve(parts[1] !== '(none)' ? parts[1] : null);
      return true;
    };

    // Ponderhit: player played the move Stockfish was already pondering
    if (sfPonder.active && playerMove && playerMove === sfPonder.move) {
      sfPonder.active = false;
      sfCallback = onBestmove;
      stockfish.postMessage('ponderhit');
      return;
    }

    // Stop any ongoing ponder, then start a fresh search
    if (sfPonder.active) {
      sfPonder.active = false;
      sfCallback = msg => {
        if (!msg.startsWith('bestmove')) return false;
        sfCallback = onBestmove;
        stockfish.postMessage('position fen ' + fen);
        stockfish.postMessage('go movetime ' + getMoveTime());
        return true;
      };
      stockfish.postMessage('stop');
      return;
    }

    sfCallback = onBestmove;
    stockfish.postMessage('position fen ' + fen);
    stockfish.postMessage('go movetime ' + getMoveTime());
  });
}

function startPondering(fenAfterEngineMove) {
  if (!stockfish || !sfPonderNext || state.aiVsAiMode) return;
  sfPonder.active = true;
  sfPonder.move   = sfPonderNext;
  sfPonderNext    = null;
  stockfish.postMessage('position fen ' + fenAfterEngineMove + ' moves ' + sfPonder.move);
  stockfish.postMessage('go ponder movetime ' + getMoveTime());
}

// Claude explains the chosen move — cosmetic, fires after move is played
async function explainMove(moveStr, color, fen) {
  const apiKey = document.getElementById('apiKeyInput').value.trim() || ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') return;
  try {
    const resp = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-calls': 'true',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 300,
        messages: [{
          role: 'user',
          content: `You are a chess commentator. Stockfish 16 just played ${moveStr} as ${color === 'w' ? 'White' : 'Black'} from this FEN: ${fen}\n\nIn 2-3 sentences explain the key idea behind this move — what threat it creates, what it defends, or what strategic goal it achieves. Be concise and insightful.`,
        }],
      }),
    });
    if (resp.ok) {
      const data = await resp.json();
      const text = data.content?.[0]?.text || '';
      if (text) document.getElementById('aiLog').textContent = text;
    }
  } catch (_) { /* cosmetic — ignore errors */ }
}

function parseMoveStr(str) {
  if (!str || str.length < 4) return null;
  return {
    from:      nameToIdx(str.slice(0, 2)),
    to:        nameToIdx(str.slice(2, 4)),
    promotion: str.length >= 5 ? str[4].toUpperCase() : null,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// Promotion UI
// ─────────────────────────────────────────────────────────────────────────────
function showPromotionModal(move, color, callback) {
  const opts = color === 'w'
    ? [['Q','♕'],['R','♖'],['B','♗'],['N','♘']]
    : [['Q','♛'],['R','♜'],['B','♝'],['N','♞']];
  const container = document.getElementById('promoPieces');
  container.innerHTML = '';
  for (const [p, u] of opts) {
    const el = document.createElement('div');
    el.className = 'promo-piece';
    el.textContent = u;
    el.onclick = () => {
      document.getElementById('promoOverlay').classList.remove('show');
      callback(p);
    };
    container.appendChild(el);
  }
  document.getElementById('promoOverlay').classList.add('show');
}

// ─────────────────────────────────────────────────────────────────────────────
// Rendering
// ─────────────────────────────────────────────────────────────────────────────
function renderBoard() {
  const boardEl = document.getElementById('board');
  boardEl.innerHTML = '';

  const legal = legalMoves(state, state.turn);
  const legalToSet = new Set(
    state.selected !== null ? legal.filter(m => m.from === state.selected).map(m => m.to) : []
  );

  let inCheckKing = -1;
  if (isInCheck(state, state.turn)) {
    for (let i = 0; i < 64; i++) if (state.board[i] === state.turn + 'K') inCheckKing = i;
  }

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const idx = sq(r, c);
      const p   = state.board[idx];
      const div = document.createElement('div');
      div.className = 'sq ' + ((r + c) % 2 === 0 ? 'light' : 'dark');

      if (idx === state.selected) div.classList.add('selected');
      if (state.lastMove && (idx === state.lastMove.from || idx === state.lastMove.to))
        div.classList.add('last-move');
      if (idx === inCheckKing) div.classList.add('in-check');

      if (p) {
        div.textContent = PIECES[p] || '?';
        div.classList.add(isWhite(p) ? 'white-piece' : 'black-piece');
      }

      if (legalToSet.has(idx)) {
        const marker = document.createElement('div');
        marker.className = (p && colorOf(p) !== state.turn) ? 'capture-ring' : 'move-dot';
        div.appendChild(marker);
      }

      div.addEventListener('click', () => handleSquareClick(idx));
      boardEl.appendChild(div);
    }
  }
}

function renderLabels() {
  const rankEl = document.getElementById('rankLabels');
  const fileEl = document.getElementById('fileLabels');
  rankEl.innerHTML = '';
  fileEl.innerHTML = '';
  for (let r = 0; r < 8; r++) {
    const s = document.createElement('span');
    s.textContent = 8 - r;
    rankEl.appendChild(s);
  }
  for (let c = 0; c < 8; c++) {
    const s = document.createElement('span');
    s.textContent = FILE_NAMES[c];
    fileEl.appendChild(s);
  }
}

function renderSidePanel() {
  document.getElementById('turnDisplay').textContent =
    state.gameOver ? 'Game Over' : (state.turn === 'w' ? 'White' : 'Black') + ' to move';

  const histEl = document.getElementById('moveHistory');
  histEl.textContent = state.moveListAlg.join('\n');
  histEl.scrollTop = histEl.scrollHeight;

  document.getElementById('capturedByWhite').textContent =
    state.capturedByWhite.map(p => PIECES[p] || '').join('');
  document.getElementById('capturedByBlack').textContent =
    state.capturedByBlack.map(p => PIECES[p] || '').join('');
}

function render() {
  renderBoard();
  renderSidePanel();
}

// ─────────────────────────────────────────────────────────────────────────────
// Player interaction
// ─────────────────────────────────────────────────────────────────────────────
function handleSquareClick(idx) {
  if (state.gameOver || state.aiVsAiMode || state.turn === 'b') return;

  const legal = legalMoves(state, state.turn);

  if (state.selected === null) {
    if (state.board[idx] && colorOf(state.board[idx]) === state.turn &&
        legal.some(m => m.from === idx)) {
      state.selected = idx;
      render();
    }
    return;
  }

  if (idx === state.selected) { state.selected = null; render(); return; }

  const candidates = legal.filter(m => m.from === state.selected && m.to === idx);
  if (!candidates.length) {
    if (state.board[idx] && colorOf(state.board[idx]) === state.turn &&
        legal.some(m => m.from === idx)) {
      state.selected = idx;
    } else {
      state.selected = null;
    }
    render();
    return;
  }

  const m = candidates[0];
  const isPromo = m.piece[1] === 'P' && (row(m.to) === 0 || row(m.to) === 7);
  state.selected = null;

  if (isPromo) {
    showPromotionModal(m, state.turn, promo => doPlayerMove({ ...m, promotion: promo }));
  } else {
    doPlayerMove(m);
  }
}

function doPlayerMove(move) {
  const playerUci = sqName(move.from) + sqName(move.to) + (move.promotion ? move.promotion.toLowerCase() : '');
  if (!executeMove(move)) return;
  render();
  const go = checkGameOver();
  if (go.over) { handleGameOver(go); return; }
  setTimeout(() => doAITurn('b', playerUci), 200);
}

// ─────────────────────────────────────────────────────────────────────────────
// AI turn
// ─────────────────────────────────────────────────────────────────────────────
async function doAITurn(color, playerMove = null) {
  if (state.gameOver) return;
  if (!stockfish) {
    document.getElementById('aiLog').textContent = 'Stockfish not ready — please wait.';
    return;
  }

  const isPonderHit = sfPonder.active && playerMove !== null && playerMove === sfPonder.move;
  document.getElementById('thinkingIndicator').classList.add('show');
  document.getElementById('aiLog').textContent = isPonderHit
    ? 'Stockfish: ponderhit! (instant response)'
    : 'Stockfish thinking (' + getMoveTime() + 'ms)...';
  render();

  const fen = toFEN(state);

  try {
    const mvStr = await getStockfishMove(fen, playerMove);
    document.getElementById('thinkingIndicator').classList.remove('show');

    if (!mvStr) { render(); return; }

    const mv = parseMoveStr(mvStr);
    if (!mv) { render(); return; }

    const piece = state.board[mv.from];
    if (piece && piece[1] === 'P' && (row(mv.to) === 0 || row(mv.to) === 7) && !mv.promotion)
      mv.promotion = 'Q';

    executeMove(mv);
    render();

    const go = checkGameOver();
    if (go.over) { handleGameOver(go); return; }

    // Start pondering the expected opponent reply (player vs AI only)
    if (!state.aiVsAiMode) startPondering(toFEN(state));

    explainMove(mvStr, color, fen);

  } catch (err) {
    document.getElementById('thinkingIndicator').classList.remove('show');
    document.getElementById('aiLog').textContent = 'Engine error: ' + err.message;
    const legal = legalMoves(state, color);
    if (legal.length) {
      const m = legal[Math.floor(Math.random() * legal.length)];
      if (m.piece[1] === 'P' && (row(m.to) === 0 || row(m.to) === 7)) m.promotion = 'Q';
      executeMove(m);
      render();
      const go = checkGameOver();
      if (go.over) handleGameOver(go);
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// AI vs AI
// ─────────────────────────────────────────────────────────────────────────────
async function runAIvsAI() {
  state.aiVsAiRunning = true;
  while (state.aiVsAiRunning && !state.gameOver) {
    await doAITurn(state.turn);
    const go = checkGameOver();
    if (go.over) { handleGameOver(go); break; }
    await new Promise(r => setTimeout(r, 500));
  }
  state.aiVsAiRunning = false;
  document.getElementById('btnStartAI').textContent = 'Start AI vs AI';
}

// ─────────────────────────────────────────────────────────────────────────────
// Game over
// ─────────────────────────────────────────────────────────────────────────────
function handleGameOver(go) {
  state.gameOver = true;
  state.aiVsAiRunning = false;
  render();

  const messages = {
    checkmate:  [(go.winner === 'w' ? 'White' : 'Black') + ' wins!', 'Checkmate'],
    stalemate:  ['Draw', 'Stalemate'],
    '50-move':  ['Draw', '50-move rule'],
    repetition: ['Draw', 'Threefold repetition'],
  };
  const [title, msg] = messages[go.reason] || ['Game Over', ''];
  document.getElementById('gameoverTitle').textContent = title;
  document.getElementById('gameoverMsg').textContent   = msg;
  document.getElementById('gameoverOverlay').classList.add('show');
}

// ─────────────────────────────────────────────────────────────────────────────
// UI controls
// ─────────────────────────────────────────────────────────────────────────────
function newGame() {
  state.aiVsAiRunning = false;
  // Cancel any ongoing search or ponder
  sfPonder     = { active: false, move: null };
  sfPonderNext = null;
  sfCallback   = null;
  if (stockfish) stockfish.postMessage('stop');
  initState();
  document.getElementById('gameoverOverlay').classList.remove('show');
  document.getElementById('thinkingIndicator').classList.remove('show');
  document.getElementById('aiLog').textContent = stockfish ? 'Stockfish 16 ready' : 'Loading Stockfish 16...';
  render();
}

document.getElementById('btnNew').addEventListener('click', newGame);

document.getElementById('btnGameoverNew').addEventListener('click', () => {
  document.getElementById('gameoverOverlay').classList.remove('show');
  newGame();
});

document.getElementById('btnUndo').addEventListener('click', () => {
  if (state.aiVsAiMode || state.aiVsAiRunning) return;
  undoMove(); // AI ply
  undoMove(); // player ply
  state.selected = null;
  render();
});

document.getElementById('modeToggle').addEventListener('click', () => {
  state.aiVsAiRunning = false;
  state.aiVsAiMode = !state.aiVsAiMode;
  document.getElementById('modeToggle').classList.toggle('on', state.aiVsAiMode);
  document.getElementById('aiVsAiControls').style.display = state.aiVsAiMode ? 'block' : 'none';
  document.getElementById('btnUndo').disabled = state.aiVsAiMode;
  newGame();
});

document.getElementById('btnStartAI').addEventListener('click', () => {
  if (state.aiVsAiRunning) {
    state.aiVsAiRunning = false;
    document.getElementById('btnStartAI').textContent = 'Start AI vs AI';
  } else {
    document.getElementById('btnStartAI').textContent = 'Stop';
    runAIvsAI();
  }
});

document.getElementById('strengthSlider').addEventListener('input', () => {
  const elo = parseInt(document.getElementById('strengthSlider').value);
  document.getElementById('eloLabel').textContent = elo;
  applyStrength(elo);
});

// ─────────────────────────────────────────────────────────────────────────────
// Openings Screen
// ─────────────────────────────────────────────────────────────────────────────
const ob = {
  board: null, turn: 'w',
  castling: { wK: true, wQ: true, bK: true, bQ: true },
  enPassant: null,
  moveIndex: 0, moves: [], explanations: [],
  move_data: [],
  openingId: null, varIndex: -1,
  mode: 'demo', selected: null,
  autoTimer: null, autoPlaying: false,
  practiceComplete: false,
  filterQuery: '', filterCat: 'all',
  flipped: false,
  playerColor: 'w',
  yellowPending: null,
  offMainLine: false,
};

function obInitBoard() {
  const board = Array(64).fill(null);
  const back = ['R','N','B','Q','K','B','N','R'];
  for (let c = 0; c < 8; c++) {
    board[sq(0,c)] = 'b'+back[c]; board[sq(7,c)] = 'w'+back[c];
    board[sq(1,c)] = 'bP';        board[sq(6,c)] = 'wP';
  }
  return board;
}

function obGotoIndex(idx) {
  const s = { board: obInitBoard(), turn: 'w', castling: { wK:true,wQ:true,bK:true,bQ:true }, enPassant: null };
  for (let i = 0; i < idx && i < ob.moves.length; i++) {
    const uci  = ob.moves[i];
    const from = nameToIdx(uci.slice(0,2));
    const to   = nameToIdx(uci.slice(2,4));
    const promo = uci.length >= 5 ? uci[4].toUpperCase() : null;
    const legal = legalMoves(s, s.turn);
    const m = legal.find(m => m.from===from && m.to===to && (m.promotion||null)===promo);
    if (m) {
      const res = applyMoveToBoard(s.board, m, s.castling);
      s.board = res.board; s.castling = res.castling;
      s.enPassant = res.enPassant; s.turn = opponent(s.turn);
    }
  }
  ob.board = s.board; ob.turn = s.turn;
  ob.castling = s.castling; ob.enPassant = s.enPassant;
  ob.moveIndex = idx;
}

function obLoad(moves, explanations) {
  if (ob.autoTimer) { clearInterval(ob.autoTimer); ob.autoTimer = null; ob.autoPlaying = false; }
  ob.moves = moves; ob.explanations = explanations || [];
  ob.selected = null; ob.practiceComplete = false;
  obGotoIndex(0);
}

/* ── Board render ── */
function renderObBoard() {
  const container = document.getElementById('openingBoard');
  if (!container) return;
  container.innerHTML = '';
  const isPractice = ob.mode === 'practice';
  container.className = 'ob-board-grid' + (isPractice ? ' ob-practice' : '');

  const lmSqs = isPractice && ob.selected !== null && !ob.practiceComplete
    ? legalMoves(ob, ob.turn).filter(m => m.from === ob.selected).map(m => m.to) : [];
  const lmSet = new Set(lmSqs);

  let lastFrom = -1, lastTo = -1;
  if (ob.moveIndex > 0) {
    const u = ob.moves[ob.moveIndex - 1];
    lastFrom = nameToIdx(u.slice(0,2)); lastTo = nameToIdx(u.slice(2,4));
  }

  for (let ri = 0; ri < 8; ri++) {
    for (let ci = 0; ci < 8; ci++) {
      const r = ob.flipped ? 7 - ri : ri;
      const c = ob.flipped ? 7 - ci : ci;
      const idx = sq(r,c), p = ob.board[idx];
      const div = document.createElement('div');
      div.className = 'ob-sq ' + ((r+c)%2===0 ? 'ob-light' : 'ob-dark');
      if (idx === ob.selected)                div.classList.add('ob-sel');
      if (idx === lastFrom || idx === lastTo) div.classList.add('ob-last');
      if (p) {
        div.textContent = PIECES[p] || '';
        div.classList.add(isWhite(p) ? 'white-piece' : 'black-piece');
      }
      if (lmSet.has(idx)) {
        const dot = document.createElement('div');
        dot.className = (p && colorOf(p) !== ob.turn) ? 'ob-capture-ring' : 'ob-dot';
        div.appendChild(dot);
      }
      if (isPractice) div.addEventListener('click', () => handleObClick(idx));
      container.appendChild(div);
    }
  }
}

/* ── Move list ── */
function obQuickSAN(uci, boardSnap) {
  const from  = nameToIdx(uci.slice(0,2));
  const to    = nameToIdx(uci.slice(2,4));
  const promo = uci.length >= 5 ? uci[4].toUpperCase() : null;
  const p = boardSnap[from];
  if (!p) return uci;
  const type = p[1], toSq = sqName(to), isCapture = !!boardSnap[to];
  if (type==='K' && Math.abs(col(to)-col(from))===2)
    return col(to) > col(from) ? 'O-O' : 'O-O-O';
  if (type==='P') {
    let s = isCapture ? FILE_NAMES[col(from)]+'x'+toSq : toSq;
    if (promo) s += '='+promo;
    return s;
  }
  return type + (isCapture ? 'x' : '') + toSq;
}

function renderObMoveList() {
  const el = document.getElementById('obMoveList');
  if (!el) return;
  let html = '';
  let s = { board: obInitBoard(), turn:'w', castling:{wK:true,wQ:true,bK:true,bQ:true}, enPassant:null };
  for (let i = 0; i < ob.moves.length; i++) {
    const uci = ob.moves[i];
    const san = obQuickSAN(uci, s.board);
    const isCur    = i === ob.moveIndex - 1;
    const isPlayed = i < ob.moveIndex;
    if (i%2===0) html += `<span class="ob-mnum">${Math.floor(i/2)+1}.</span>`;
    html += `<span class="ob-move${isCur?' ob-move-cur':''}${isPlayed&&!isCur?' ob-move-done':''}">${san}</span>`;
    const from  = nameToIdx(uci.slice(0,2));
    const to    = nameToIdx(uci.slice(2,4));
    const promo = uci.length >= 5 ? uci[4].toUpperCase() : null;
    const legal = legalMoves(s, s.turn);
    const m = legal.find(m=>m.from===from&&m.to===to&&(m.promotion||null)===promo);
    if (m) {
      const res = applyMoveToBoard(s.board, m, s.castling);
      s.board=res.board; s.castling=res.castling; s.enPassant=res.enPassant; s.turn=opponent(s.turn);
    }
  }
  el.innerHTML = html;
  const cur = el.querySelector('.ob-move-cur');
  if (cur) cur.scrollIntoView({ block: 'nearest' });
}

function renderObExpl() {
  const el = document.getElementById('obMoveExpl');
  if (!el) return;

  if (ob.moveIndex === 0) {
    const colorHe = ob.playerColor === 'w' ? 'לבן' : 'שחור';
    el.innerHTML = ob.mode === 'demo'
      ? '<span class="expl-hint">לחץ ⏭ להתחיל, או ▶ לנגינה אוטומטית</span>'
      : `<span class="expl-hint">אתה ${colorHe} — שחק את המהלכים הנכונים</span>`;
    el.style.opacity = '0.8';
    return;
  }

  el.style.opacity = '1';
  const moveIdx = ob.moveIndex - 1;
  const md = ob.move_data && ob.move_data[moveIdx];

  let html = '';
  if (md) {
    html += `<div class="expl-main">${md.explanation_he}</div>`;
    if (md.why_good)           html += `<div class="expl-why">💡 ${md.why_good}</div>`;
    if (md.common_mistakes_he) html += `<div class="expl-mistake">⚠️ ${md.common_mistakes_he}</div>`;
    if (ob.mode === 'demo' && md.opponent_alternatives && md.opponent_alternatives.length > 0)
      html += `<button class="ob-whatif-btn" onclick="showWhatIf(${moveIdx})">🔍 מה אם ישחקו אחרת?</button>`;
  } else if (ob.explanations[moveIdx]) {
    html += `<div class="expl-main">${ob.explanations[moveIdx]}</div>`;
  }

  el.innerHTML = html;
}

function renderObAll() { renderObBoard(); renderObMoveList(); renderObExpl(); }

/* ── Demo controls ── */
function nextDemoMove() {
  if (ob.moveIndex >= ob.moves.length) return;
  obGotoIndex(ob.moveIndex + 1);
  renderObAll();
}
function prevDemoMove() {
  if (ob.moveIndex <= 0) return;
  obGotoIndex(ob.moveIndex - 1);
  renderObAll();
}
function toggleAutoPlay() {
  const btn = document.querySelector('.ob-play-btn');
  if (ob.autoPlaying) {
    clearInterval(ob.autoTimer); ob.autoTimer = null; ob.autoPlaying = false;
    if (btn) btn.textContent = '▶';
    return;
  }
  if (ob.moveIndex >= ob.moves.length) obGotoIndex(0);
  ob.autoPlaying = true;
  if (btn) btn.textContent = '⏸';
  ob.autoTimer = setInterval(() => {
    if (ob.moveIndex >= ob.moves.length) {
      clearInterval(ob.autoTimer); ob.autoTimer = null; ob.autoPlaying = false;
      if (btn) btn.textContent = '▶';
    } else { nextDemoMove(); }
  }, 1300);
}

/* ── Practice controls ── */
function isPlayerTurn() {
  return ob.playerColor === 'w' ? ob.moveIndex % 2 === 0 : ob.moveIndex % 2 !== 0;
}

function autoPlayOpponentIfNeeded() {
  if (ob.practiceComplete || ob.moveIndex >= ob.moves.length) return;
  const opponentTurn = ob.playerColor === 'w' ? ob.moveIndex % 2 !== 0 : ob.moveIndex % 2 === 0;
  if (!opponentTurn) return;
  setTimeout(() => {
    obGotoIndex(ob.moveIndex + 1);
    renderObAll();
    if (ob.moveIndex >= ob.moves.length) {
      ob.practiceComplete = true;
      document.getElementById('obComplete').style.display = 'flex';
    }
  }, 700);
}

function handleObClick(idx) {
  if (ob.mode !== 'practice' || ob.practiceComplete) return;
  if (ob.yellowPending) return;

  // Off main line: free exploration, any side can move
  if (ob.offMainLine) {
    if (ob.selected === null) {
      if (ob.board[idx] && colorOf(ob.board[idx]) === ob.turn) {
        if (legalMoves(ob, ob.turn).some(m => m.from === idx)) {
          ob.selected = idx; renderObBoard();
        }
      }
      return;
    }
    if (idx === ob.selected) { ob.selected = null; renderObBoard(); return; }
    const legal = legalMoves(ob, ob.turn);
    const m = legal.find(m => m.from === ob.selected && m.to === idx);
    if (m) {
      const res = applyMoveToBoard(ob.board, m, ob.castling);
      ob.board = res.board; ob.castling = res.castling;
      ob.enPassant = res.enPassant; ob.turn = opponent(ob.turn);
      ob.moveIndex++;
      ob.selected = null;
      renderObAll();
    } else {
      ob.selected = null;
      renderObBoard();
    }
    return;
  }

  if (!isPlayerTurn()) return;

  if (ob.selected === null) {
    if (ob.board[idx] && colorOf(ob.board[idx]) === ob.playerColor) {
      if (legalMoves(ob, ob.turn).some(m => m.from === idx)) {
        ob.selected = idx; renderObBoard();
      }
    }
    return;
  }
  if (idx === ob.selected) { ob.selected = null; renderObBoard(); return; }

  const expUci  = ob.moves[ob.moveIndex];
  const expFrom = nameToIdx(expUci.slice(0,2));
  const expTo   = nameToIdx(expUci.slice(2,4));

  if (ob.selected === expFrom && idx === expTo) {
    // Correct main line move
    obGotoIndex(ob.moveIndex + 1);
    ob.selected = null;
    showObMsg('✓ מעולה!', 'ok');
    renderObAll();
    if (ob.moveIndex >= ob.moves.length) {
      ob.practiceComplete = true;
      document.getElementById('obComplete').style.display = 'flex';
      return;
    }
    autoPlayOpponentIfNeeded();
  } else {
    // Check if it's a listed alternative
    const currentMD = ob.move_data && ob.move_data[ob.moveIndex];
    const alt = currentMD && currentMD.alternative_moves
      ? currentMD.alternative_moves.find(a => {
          const af = nameToIdx(a.move.slice(0,2));
          const at = nameToIdx(a.move.slice(2,4));
          return af === ob.selected && at === idx;
        })
      : null;

    if (alt) {
      if (alt.verdict === 'ok') {
        ob.yellowPending = { from: ob.selected, to: idx, altData: alt };
        ob.selected = null;
        showYellowChoice(alt);
        renderObBoard();
        return;
      } else {
        ob.selected = null;
        showObMsg('⚠️ ' + (alt.note_he || 'לא הכיוון המומלץ — נסה שוב'), 'err');
        renderObBoard();
        return;
      }
    }

    ob.selected = null;
    showObMsg('לא נכון — נסה שוב 💡', 'err');
    renderObBoard();
  }
}

function showObMsg(txt, type) {
  const el = document.getElementById('practiceMsg');
  if (!el) return;
  el.textContent = txt;
  el.className = 'practice-msg' + (type ? ' pm-'+type : '');
  clearTimeout(el._t);
  el._t = setTimeout(() => { el.textContent = ''; el.className = 'practice-msg'; }, 2500);
}

function hintPractice() {
  if (ob.practiceComplete || ob.moveIndex >= ob.moves.length) return;
  if (ob.yellowPending) return;
  if (!isPlayerTurn()) return;
  ob.selected = nameToIdx(ob.moves[ob.moveIndex].slice(0,2));
  renderObBoard();
  showObMsg('הרמז: הכלי סומן — בחר יעד', 'hint');
}

function resetPractice() {
  ob.offMainLine = false;
  ob.yellowPending = null;
  ob.selected = null;
  const ycEl = document.getElementById('yellowChoice');
  if (ycEl) ycEl.style.display = 'none';
  obLoad(ob.moves, ob.explanations);
  document.getElementById('obComplete').style.display = 'none';
  showObMsg('', '');
  renderObAll();
  autoPlayOpponentIfNeeded();
}

/* ── Yellow choice & What-if ── */
function showYellowChoice(altData) {
  const el  = document.getElementById('yellowChoice');
  const msg = document.getElementById('yellowChoiceMsg');
  if (!el || !msg) return;
  msg.innerHTML = `<strong>מהלך תקין!</strong> ${altData.note_he || ''}<br><span style="font-size:0.8rem;color:#888">המשך בקו זה או חזור לקו הראשי?</span>`;
  el.style.display = 'block';
}

function handleYellowChoice(choice) {
  const el = document.getElementById('yellowChoice');
  if (el) el.style.display = 'none';
  if (!ob.yellowPending) return;
  const { from, to } = ob.yellowPending;
  ob.yellowPending = null;
  if (choice === 'continue') {
    const legal = legalMoves(ob, ob.turn);
    const m = legal.find(m => m.from === from && m.to === to);
    if (m) {
      const res = applyMoveToBoard(ob.board, m, ob.castling);
      ob.board = res.board; ob.castling = res.castling;
      ob.enPassant = res.enPassant; ob.turn = opponent(ob.turn);
      ob.moveIndex++;
      ob.offMainLine = true;
      showObMsg('ממשיכים בקו חלופי — שחק חופשי', 'hint');
      renderObAll();
    }
  } else {
    showObMsg('חוזרים לקו הראשי', 'hint');
    renderObBoard();
  }
}

function showWhatIf(moveIdx) {
  const md = ob.move_data && ob.move_data[moveIdx];
  if (!md || !md.opponent_alternatives || !md.opponent_alternatives.length) return;
  // build board state after playing moves[0..moveIdx]
  const s = { board: obInitBoard(), turn:'w', castling:{wK:true,wQ:true,bK:true,bQ:true}, enPassant:null };
  for (let i = 0; i <= moveIdx && i < ob.moves.length; i++) {
    const uci = ob.moves[i];
    const from = nameToIdx(uci.slice(0,2)), to = nameToIdx(uci.slice(2,4));
    const promo = uci.length >= 5 ? uci[4].toUpperCase() : null;
    const legal = legalMoves(s, s.turn);
    const m = legal.find(m => m.from===from && m.to===to && (m.promotion||null)===promo);
    if (m) { const r = applyMoveToBoard(s.board, m, s.castling); s.board=r.board; s.castling=r.castling; s.enPassant=r.enPassant; s.turn=opponent(s.turn); }
  }
  const panel   = document.getElementById('obWhatIf');
  const content = document.getElementById('obWhatIfContent');
  if (!panel || !content) return;
  content.innerHTML = md.opponent_alternatives.map(alt => {
    const san = obQuickSAN(alt.move, s.board);
    return `<div class="whatif-item"><span class="whatif-move">${san}</span><span class="whatif-note">${alt.explanation_he}</span></div>`;
  }).join('');
  panel.style.display = 'block';
}

function closeWhatIf() {
  const el = document.getElementById('obWhatIf');
  if (el) el.style.display = 'none';
}

function togglePracticeColor() {
  ob.playerColor = ob.playerColor === 'w' ? 'b' : 'w';
  ob.flipped     = ob.playerColor === 'b';
  const btn = document.getElementById('btnFlipPractice');
  if (btn) {
    btn.textContent = ob.playerColor === 'w' ? '⬛ שחק כשחור' : '⬜ שחק כלבן';
    btn.classList.toggle('flipped', ob.playerColor === 'b');
  }
  ob.selected = null; ob.practiceComplete = false;
  ob.offMainLine = false; ob.yellowPending = null;
  const ycEl = document.getElementById('yellowChoice');
  if (ycEl) ycEl.style.display = 'none';
  obGotoIndex(0);
  document.getElementById('obComplete').style.display = 'none';
  showObMsg('', '');
  renderObAll();
  autoPlayOpponentIfNeeded();
}

/* ── Variation & Mode ── */
function renderObVarTabs(opening) {
  const el = document.getElementById('obVariationTabs');
  if (!el) return;
  if (!opening.variations || !opening.variations.length) { el.innerHTML = ''; return; }
  let html = `<button class="ob-var-tab active" onclick="switchObVar(-1,this)">קו ראשי</button>`;
  opening.variations.forEach((v,i) => {
    html += `<button class="ob-var-tab" onclick="switchObVar(${i},this)">${v.name_he}</button>`;
  });
  el.innerHTML = html;
}

function switchObVar(idx, btn) {
  const opening = openingsDatabase.find(o => o.id === ob.openingId);
  if (!opening) return;
  ob.varIndex = idx;
  document.querySelectorAll('.ob-var-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const moves = idx === -1 ? opening.moves : opening.variations[idx].moves;
  const expl  = idx === -1 ? opening.move_explanations_he : (opening.variations[idx].explanations || []);
  ob.move_data = idx === -1 ? (opening.move_data || []) : (opening.variations[idx].move_data || []);
  ob.offMainLine = false; ob.yellowPending = null;
  const wiEl = document.getElementById('obWhatIf');
  if (wiEl) wiEl.style.display = 'none';
  obLoad(moves, expl);
  document.getElementById('obComplete').style.display = 'none';
  renderObAll();
}

function switchObMode(mode, noReset) {
  ob.mode = mode;
  if (mode !== 'demo' && ob.autoPlaying) {
    clearInterval(ob.autoTimer); ob.autoTimer = null; ob.autoPlaying = false;
    const b = document.querySelector('.ob-play-btn');
    if (b) b.textContent = '▶';
  }
  if (!noReset) {
    ob.selected = null; ob.practiceComplete = false;
    ob.offMainLine = false; ob.yellowPending = null;
    ob.playerColor = 'w'; ob.flipped = false;
    const flipBtn = document.getElementById('btnFlipPractice');
    if (flipBtn) { flipBtn.textContent = '⬛ שחק כשחור'; flipBtn.classList.remove('flipped'); }
    const ycEl = document.getElementById('yellowChoice');
    if (ycEl) ycEl.style.display = 'none';
    const wiEl = document.getElementById('obWhatIf');
    if (wiEl) wiEl.style.display = 'none';
    obGotoIndex(0);
    document.getElementById('obComplete').style.display = 'none';
    showObMsg('', '');
  }
  document.getElementById('btnObDemo').classList.toggle('active', mode === 'demo');
  document.getElementById('btnObPractice').classList.toggle('active', mode === 'practice');
  document.getElementById('demoControls').style.display     = mode === 'demo' ? 'flex' : 'none';
  document.getElementById('practiceControls').style.display = mode === 'practice' ? 'flex' : 'none';
  renderObAll();
  if (mode === 'practice') {
    showObMsg('אתה לבן — שחק את המהלכים הנכונים', 'hint');
    autoPlayOpponentIfNeeded();
  }
}

/* ── Card notation helper ── */
function obCardNotation(moves) {
  let result = '';
  let s = { board: obInitBoard(), turn:'w', castling:{wK:true,wQ:true,bK:true,bQ:true}, enPassant:null };
  for (let i = 0; i < Math.min(moves.length, 6); i++) {
    const uci = moves[i];
    const san = obQuickSAN(uci, s.board);
    if (i%2===0) result += (i/2+1) + '.';
    result += san + ' ';
    const from  = nameToIdx(uci.slice(0,2));
    const to    = nameToIdx(uci.slice(2,4));
    const promo = uci.length >= 5 ? uci[4].toUpperCase() : null;
    const legal = legalMoves(s, s.turn);
    const m = legal.find(m=>m.from===from&&m.to===to&&(m.promotion||null)===promo);
    if (m) {
      const res = applyMoveToBoard(s.board, m, s.castling);
      s.board=res.board; s.castling=res.castling; s.enPassant=res.enPassant; s.turn=opponent(s.turn);
    }
  }
  return result.trim() + (moves.length > 6 ? ' …' : '');
}

/* ── Opening list screen ── */
function renderOpeningsList() {
  const grid = document.getElementById('openingsGrid');
  if (!grid) return;
  const q   = ob.filterQuery.trim().toLowerCase();
  const cat = ob.filterCat;
  const filtered = openingsDatabase.filter(o => {
    if (cat !== 'all' && o.category !== cat) return false;
    if (q && !o.name_he.includes(q) && !o.name_en.toLowerCase().includes(q)) return false;
    return true;
  });
  if (!filtered.length) {
    grid.innerHTML = '<div class="ob-no-results">לא נמצאו פתיחות</div>';
    return;
  }
  grid.innerHTML = filtered.map(o => `
    <div class="opening-card" onclick="openOpeningDetail('${o.id}')">
      <div class="oc-he">${o.name_he}</div>
      <div class="oc-en">${o.name_en}</div>
      <div class="oc-moves">${obCardNotation(o.moves)}</div>
    </div>
  `).join('');
}

function filterOpenings(q) { ob.filterQuery = q; renderOpeningsList(); }

function setCatFilter(cat, btn) {
  ob.filterCat = cat;
  document.querySelectorAll('.cat-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderOpeningsList();
}

/* ── Opening detail screen ── */
function openOpeningDetail(id) {
  const opening = openingsDatabase.find(o => o.id === id);
  if (!opening) return;
  ob.openingId = id; ob.varIndex = -1; ob.mode = 'demo';
  ob.move_data = opening.move_data || [];
  ob.playerColor = 'w'; ob.flipped = false;
  ob.offMainLine = false; ob.yellowPending = null;
  document.getElementById('openingsListView').style.display  = 'none';
  document.getElementById('openingDetailView').style.display = 'flex';
  document.getElementById('obDetailTitle').textContent = opening.name_he + ' · ' + opening.name_en;
  document.getElementById('obDetailDesc').textContent  = opening.description_he;
  renderObVarTabs(opening);
  obLoad(opening.moves, opening.move_explanations_he);
  document.getElementById('btnObDemo').classList.add('active');
  document.getElementById('btnObPractice').classList.remove('active');
  document.getElementById('demoControls').style.display     = 'flex';
  document.getElementById('practiceControls').style.display = 'none';
  document.getElementById('obComplete').style.display       = 'none';
  const wiEl = document.getElementById('obWhatIf');
  if (wiEl) wiEl.style.display = 'none';
  const ycEl = document.getElementById('yellowChoice');
  if (ycEl) ycEl.style.display = 'none';
  const flipBtn = document.getElementById('btnFlipPractice');
  if (flipBtn) { flipBtn.textContent = '⬛ שחק כשחור'; flipBtn.classList.remove('flipped'); }
  renderObAll();
}

// ─────────────────────────────────────────────────────────────────────────────
// Screen navigation
// ─────────────────────────────────────────────────────────────────────────────
function hideAllScreens() {
  ['mainMenu','gameScreen','placeholderScreen','openingsScreen']
    .forEach(id => { const el = document.getElementById(id); if (el) el.style.display = 'none'; });
}

function showMenu() {
  if (ob.autoTimer) { clearInterval(ob.autoTimer); ob.autoTimer = null; ob.autoPlaying = false; }
  hideAllScreens();
  document.getElementById('mainMenu').style.display = 'flex';
}

function showGame() {
  hideAllScreens();
  document.getElementById('gameScreen').style.display = 'flex';
}

function showPlaceholder(name) {
  hideAllScreens();
  document.getElementById('placeholderScreen').style.display = 'flex';
  document.getElementById('placeholderTitle').textContent    = name;
}

function showOpeningsList() {
  if (ob.autoTimer) { clearInterval(ob.autoTimer); ob.autoTimer = null; ob.autoPlaying = false; }
  hideAllScreens();
  document.getElementById('openingsScreen').style.display    = 'flex';
  document.getElementById('openingsListView').style.display  = 'flex';
  document.getElementById('openingDetailView').style.display = 'none';
  renderOpeningsList();
}

// ─────────────────────────────────────────────────────────────────────────────
// Boot
// ─────────────────────────────────────────────────────────────────────────────
initState();
renderLabels();
render();
initStockfish();
showMenu();
