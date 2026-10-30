import { ProductItem } from '../types';
import heroVillaImg from '../assets/images/hero_luxury_villa_1791003841235.jpg';
import luxuryPenthouseImg from '../assets/images/luxury_penthouse_1791003853037.jpg';
import gatheringGamesImg from '../assets/images/gathering_games_asset_1791003864897.jpg';
import blueprintsImg from '../assets/images/architectural_blueprints_1791003876626.jpg';
import canvaTemplatesImg from '../assets/images/canva_templates_bundle_1791003886695.jpg';
import privateEstateMansionImg from '../assets/images/private_estate_mansion_1791299404793.jpg';
import luxuryEstateValuationImg from '../assets/images/luxury_estate_valuation_1791299419965.jpg';
import desertPalaceImg from '../assets/images/desert_palace_architecture_1791314264178.jpg';
import royalCourtyardImg from '../assets/images/royal_courtyard_fountain_1791314305941.jpg';
import skylinePenthouseTerraceImg from '../assets/images/skyline_penthouse_terrace_1791314289993.jpg';
import smartLuxuryVillaImg from '../assets/images/smart_luxury_villa_1791314277613.jpg';

export const HERO_VILLA_IMAGE = heroVillaImg;
export const LUXURY_PENTHOUSE_IMAGE = luxuryPenthouseImg;
export const GATHERING_GAMES_IMAGE = gatheringGamesImg;
export const BLUEPRINTS_IMAGE = blueprintsImg;
export const CANVA_TEMPLATES_IMAGE = canvaTemplatesImg;
export const PRIVATE_ESTATE_MANSION_IMAGE = privateEstateMansionImg;
export const LUXURY_ESTATE_VALUATION_IMAGE = luxuryEstateValuationImg;
export const DESERT_PALACE_IMAGE = desertPalaceImg;
export const ROYAL_COURTYARD_IMAGE = royalCourtyardImg;
export const SKYLINE_TERRACE_IMAGE = skylinePenthouseTerraceImg;
export const SMART_VILLA_IMAGE = smartLuxuryVillaImg;

export const MOCK_PRODUCTS: ProductItem[] = [
  {
    id: 'prop-01',
    title: 'قصر الزمرد الملكي - حطين VIP',
    subtitle: 'فيلا فاخرة بتصاميم إيطالية وحديقة زمردية ممتدة',
    category: 'real_estate',
    categoryLabel: 'عقارات النخبة',
    priceSAR: 18500000,
    discountPriceSAR: 17900000,
    rating: 4.98,
    reviewsCount: 34,
    badgeText: 'توثيق معتمد VIP',
    isVipExclusive: true,
    imageUrl: HERO_VILLA_IMAGE,
    description: 'قصر ملكي فاخر يقع في أرقى أحياء الرياض (حطين النخبة). يتكون القصر من 3 طوابق مع مصعد بانورامي، مسبح معزول بإضاءات خفيفة، وشلالات زمردية جدارية. المخطط معتمد رسمياً للبيع المباشر والتمويل العقاري.',
    features: [
      'مساحة البناء: 1,450 متر مربع',
      '8 أجنحة نوم ملكية مع خزائن ملابس خاصة',
      'مسبح ذكي مع إنارة زمردية وضبط حرارة معزول',
      'جراج خاص يستوعب 6 سيارات فاخرة',
      'جناح خاص للضيافة والمجالس العائلية'
    ],
    propertyDetails: {
      areaSqM: 1450,
      bedrooms: 8,
      bathrooms: 10,
      location: 'حي حطين، الرياض',
      city: 'الرياض',
      virtualTourAvailable: true,
      developer: 'مجموعة النخبة للتطوير العقاري',
      yearBuilt: 2025
    }
  },
  {
    id: 'prop-02',
    title: 'بنتهاوس تاج العلياء - داون تاون دبي',
    subtitle: 'شقة فاخرة برؤية بصرية 360 درجة على برج خليفة',
    category: 'real_estate',
    categoryLabel: 'عقارات النخبة',
    priceSAR: 12400000,
    rating: 4.95,
    reviewsCount: 28,
    badgeText: 'معاينة افتراضية 3D',
    isVipExclusive: true,
    imageUrl: LUXURY_PENTHOUSE_IMAGE,
    description: 'بنتهاوس ذو إطلالة أسطورية على برج خليفة ونافورة دبي. تشطيبات فاخرة بالرخام العاجي والألواح الذهبية والزمردية، جاهز للسكن الفوري أو الاستثمار العقاري عالي العائد.',
    features: [
      'إطلالة بانورامية كاملة على داون تاون دبي',
      'شرفة ملكية خاصة مع جاكوزي خارجي',
      'نظام منزل ذكي متكامل Smart Home VIP',
      'خدمة حراسة وكونسيرج على مدار 24 ساعة'
    ],
    propertyDetails: {
      areaSqM: 620,
      bedrooms: 4,
      bathrooms: 5,
      location: 'وسط مدينة دبي (Downtown)',
      city: 'دبي',
      virtualTourAvailable: true,
      developer: 'إعمار العقارية',
      yearBuilt: 2026
    }
  },
  {
    id: 'blueprint-01',
    title: 'المخطط الهندسي المعماري الملكي 2026 - فيلا مودرن',
    subtitle: 'مخططات هندسية كاملة ومجسم 3D جاهز للترخيص والتنفيذ',
    category: 'blueprints_2026',
    categoryLabel: 'مخططات 2026',
    priceSAR: 1290,
    discountPriceSAR: 890,
    rating: 4.97,
    reviewsCount: 89,
    badgeText: 'معتمد كود البناء السعودي',
    isVipExclusive: false,
    imageUrl: BLUEPRINTS_IMAGE,
    description: 'مخطط ذكي استغلالي مساحي لفيلا مودرن بمساحة أرض 400م2 ومساحة بناء 650م2. يتضمن المخطط المعماري الكامل، المخطط الإنشائي، والكهربائي والسباكة بملفات DWG وPDF مع ملفات الرندر ثلاثية الأبعاد.',
    features: [
      'مطابق تماماً لاشتراطات كود البناء السعودي بلدي 2026',
      'توزيع مثالي للصالات المفتوحة والمجالس والحدائق الداخلية',
      'ملفات DWG قابلة للتعديل لدى مكتبك الهندسي',
      'جدول كميات ومواصفات التشطيبات الموصى بها'
    ],
    digitalDetails: {
      fileFormat: 'AutoCAD (DWG) + PDF + 3D Max Renders',
      fileSize: '120 MB',
      instantDownload: true,
      compatibleApps: ['AutoCAD', 'Revit', 'PDF Readers', '3D Max']
    }
  },
  {
    id: 'canva-01',
    title: 'حقيبة قوالب كانفا الهوية الملكية (Royal Gold Kit)',
    subtitle: 'أكثر من 250 قالب سوشيال ميديا وبزنس كارد وهويات تجارية',
    category: 'canva_templates',
    categoryLabel: 'قوالب كانفا',
    priceSAR: 299,
    discountPriceSAR: 199,
    rating: 4.99,
    reviewsCount: 210,
    badgeText: 'رابط كانفا مباشر 100%',
    isVipExclusive: false,
    imageUrl: CANVA_TEMPLATES_IMAGE,
    description: 'المجموعة الملكية الأكثر فخامة لمصممي ورجال الأعمال وأصحاب المتاجر! قوالب كانفا احترافية باللون الذهبي الملكي والأخضر الزمردي تشمل بوستات انستغرام، ستوريات، كروت عمل، وعروض تقديمية (PowerPoint/Canva).',
    features: [
      'تعديل كامل بنقرة واحدة عبر حساب Canva المجاني أو البادئ',
      'خطوط عربية ملكية مدمجة مسبقاً',
      'تضمن قوالب متخصصة للعقارات، المتاجر، والدورات',
      'دليل فيديو سريع لشرح كيفية التعديل والحفظ'
    ],
    digitalDetails: {
      fileFormat: 'Canva Pro/Free Editable Links',
      fileSize: 'رابط مباشر فور الشراء',
      instantDownload: true,
      canvaEditable: true,
      compatibleApps: ['Canva Desktop & Mobile', 'Web Browser']
    }
  },
  {
    id: 'royal-01',
    title: 'باقة التشكيلة الملكية الشاملة - عقارات ورقميات',
    subtitle: 'الباقة الكبرى: الاستشارة العقارية + حزمة المنتجات الرقمية كاملة',
    category: 'royal_collection',
    categoryLabel: 'التشكيلة الملكية',
    priceSAR: 2490,
    discountPriceSAR: 1690,
    rating: 5.0,
    reviewsCount: 64,
    badgeText: 'الباقة الحصرية VIP',
    isVipExclusive: true,
    imageUrl: CANVA_TEMPLATES_IMAGE,
    description: 'باقة النخبة الملكية التي تجمع بين جلسة استشارية عقارية خاصة مدتها 60 دقيقة مع خبير تطوير عقاري + الحصول على جميع قوالب كانفا، ألعاب الجمعات، ومخطط هندسي معماري اختياري لعام 2026.',
    features: [
      'جلسة زووم استشارية عقارية خاصة 60 دقيقة',
      'جميع قوالب المتجر الرقمي بلا استثناء',
      'خصم 15% حصري على أي معاملة شراء أو تسويق عقاري',
      'دعم ملكي مباشر عبر الواتساب VIP على مدار الساعة'
    ],
    digitalDetails: {
      fileFormat: 'جلسة حية + روابط التنزيل الشاملة',
      fileSize: 'حزمة كاملة',
      instantDownload: true
    }
  },
  {
    id: 'prop-03',
    title: 'فيلا الواحة الذكية - النرجس هايتس VIP',
    subtitle: 'تصميم معماري مستدام وأنظمة طاقة شمسية وتحكم بيئي بالذكاء الاصطناعي',
    category: 'real_estate',
    categoryLabel: 'عقارات النخبة',
    priceSAR: 9800000,
    discountPriceSAR: 9350000,
    rating: 4.96,
    reviewsCount: 22,
    badgeText: 'معاينة فورية 360°',
    isVipExclusive: true,
    imageUrl: SMART_VILLA_IMAGE,
    description: 'فيلا فاخرة بتصميم معماري فائق الحداثة في شمال الرياض (حي النرجس). مجهزة بنظام ذكاء اصطناعي للتحكم بالتكييف والإضاءة، ألواح طاقة شمسية مدمجة جمالياً، مسبح عاكس وحديقة غناء داخلية بخصوصية عائلية تامة.',
    features: [
      'مساحة الأرض 550 م2 ومساحة مسطحات بناء 820 م2',
      '6 أجنحة نوم فندقية مع بلكونات وإطلالات مفتوحة',
      'نظام عزل حراري ومائي متطور يخفض استهلاك الطاقة بنسبة 45%',
      'مجلس ضيافة رسمي منفصل مع مدخل خاص ومغاسل رخام طبيعي',
      'صالة سينما منزلية مجهزة بأحدث أنظمة الصوت المحيطي'
    ],
    propertyDetails: {
      areaSqM: 820,
      bedrooms: 6,
      bathrooms: 8,
      location: 'حي النرجس هايتس، شمال الرياض',
      city: 'الرياض',
      virtualTourAvailable: true,
      developer: 'شركة واحة النخبة للتطوير',
      yearBuilt: 2026
    }
  },
  {
    id: 'prop-04',
    title: 'قصر اليمامة الملكي - واحة الدرعية التاريخية',
    subtitle: 'طراز نجدي معاصر مع فناء مائي وشلالات حجرية وأسقف خشبية نادرة',
    category: 'real_estate',
    categoryLabel: 'عقارات النخبة',
    priceSAR: 26000000,
    discountPriceSAR: 24900000,
    rating: 5.0,
    reviewsCount: 19,
    badgeText: 'قصر نخبوي حصري VIP',
    isVipExclusive: true,
    imageUrl: DESERT_PALACE_IMAGE,
    description: 'أيقونة معمارية نادرة في قلب الدرعية التاريخية تجمع بين أصالة العمارة النجدية وأحدث مفاهيم الفخامة المعاصرة. يتميز القصر بأسقف مرتفعة، أفنية داخلية ببحيرات صناعية، ومجالس استضافة كبرى تتسع لمئات الضيوف.',
    features: [
      'مساحة أرض شاسعة 2,800 م2 ومسكن قصر رئيسي وملاحق ضيافة',
      'فناء داخلي مستوحى من القصور الملكية مع نافورة وشلال صخري طبيعي',
      'مجلس أمراء ومجلس استقبال رئيسي بأفخر أنواع الرخام وخشب الساج',
      'جناح رئيسي ملكي (Master Suite) بمساحة 200 م2 مع سبا خاص',
      'أنظمة أمنية متكاملة وغرفة مراقبة وتحكم بيئي مركزي'
    ],
    propertyDetails: {
      areaSqM: 2800,
      bedrooms: 9,
      bathrooms: 14,
      location: 'واحة الدرعية التاريخية، الرياض',
      city: 'الرياض',
      virtualTourAvailable: true,
      developer: 'دار الدرعية للتطوير الفاخر',
      yearBuilt: 2025
    }
  },
  {
    id: 'prop-05',
    title: 'سكاي فيلا الأفق الملكي - كورنيش جدة الفاخر',
    subtitle: 'شقة سحابية فائقة الرفاهية مع مسبح زجاجي معلق وحديقة سماوية وتراس بحري 360°',
    category: 'real_estate',
    categoryLabel: 'عقارات النخبة',
    priceSAR: 15200000,
    discountPriceSAR: 14500000,
    rating: 4.97,
    reviewsCount: 31,
    badgeText: 'إطلالة بحرية 360°',
    isVipExclusive: true,
    imageUrl: SKYLINE_TERRACE_IMAGE,
    description: 'سكاي فيلا سكنية في أعلى أبراج كورنيش جدة الجديد، تمتد على طابقين كاملين بتراس بانورامي مكشوف ومسبح إنفينيتي زجاجي معلق يوفر إطلالة لا تنتهي على البحر الأحمر وغروب الشمس الأخّاذ.',
    features: [
      'مساحة رحبة 750 م2 تشمل طابقين متصلين بمصعد زجاجي خاص',
      'مسبح إنفينيتي بانورامي خاص على الواجهة البحرية مباشرة',
      'أثاث مصمم خصيصاً من أشهر دور التصميم الإيطالية العالمية',
      'مرسى يخت خاص ونادي صحي متكامل وخدمات كونسيرج 5 نجوم',
      'مدخل خاص للسيارات بمصعد سيارات مباشر للبنتهاوس'
    ],
    propertyDetails: {
      areaSqM: 750,
      bedrooms: 5,
      bathrooms: 7,
      location: 'الكورنيش الشمالي الجديد، جدة',
      city: 'جدة',
      virtualTourAvailable: true,
      developer: 'مجموعة البحر الأحمر للأبراج الفاخرة',
      yearBuilt: 2026
    }
  },
  {
    id: 'blueprint-02',
    title: 'حزمة المخططات المعمارية الشاملة 2026 - الفلل الحديثة المستدامة',
    subtitle: 'مخططات تنفيذية متكاملة (معماري، إنشائي، كهروميكانيكي، لاندسكيب) جاهزة للترخيص',
    category: 'blueprints_2026',
    categoryLabel: 'مخططات 2026',
    priceSAR: 1890,
    discountPriceSAR: 1250,
    rating: 4.95,
    reviewsCount: 67,
    badgeText: 'ملفات DWG + PDF مفتوحة',
    isVipExclusive: false,
    imageUrl: BLUEPRINTS_IMAGE,
    description: 'الحقيبة الهندسية الأوسع انتشاراً للمطورين العقاريين وملاّك الأراضي الراغبين في بناء فيلا مودرن ذكية وموفرة للطاقة. تتضمن الحزمة المخططات المعمارية التفصيلية، المخطط الإنشائي لحساب الأحمال، مخططات التكييف والسباكة الذكية، وجداول الكميات المعتمدة.',
    features: [
      'مطابقة 100% لكود البناء السعودي ومنصة بلدي لعام 2026',
      'تتضمن ملفات AutoCAD DWG قابلة للتعديل الحر لدى أي مكتب هندسي',
      'رندرات ثلاثية الأبعاد 4K للواجهات الخارجية والمساقط الأفقية واللاندسكيب',
      'جداول تفصيلية لحصر الكميات ومواصفات التشطيبات لضبط تكلفة المقاولين'
    ],
    digitalDetails: {
      fileFormat: 'AutoCAD (DWG) + PDF High-Res + 3D Render Models',
      fileSize: '165 MB',
      instantDownload: true,
      compatibleApps: ['AutoCAD', 'Revit', 'Adobe Acrobat', '3ds Max']
    }
  },
  {
    id: 'canva-02',
    title: 'الحقيبة العقارية الكبرى لقوالب كانفا 2026 (Real Estate Pro Suite)',
    subtitle: 'أكثر من 350 قالب تسويقي للمكاتب العقارية، إعلانات الفلل، بوستات وريلز انستغرام وتيك توك',
    category: 'canva_templates',
    categoryLabel: 'قوالب كانفا',
    priceSAR: 380,
    discountPriceSAR: 249,
    rating: 4.98,
    reviewsCount: 185,
    badgeText: 'تعديل فوري مجاني Canva',
    isVipExclusive: false,
    imageUrl: CANVA_TEMPLATES_IMAGE,
    description: 'الحل التسويقي الشامل لجميع الوسطاء والشركات العقارية وصناع المحتوى. قوالب كانفا مصممة بهوية ملكية باللون الذهبي والأخضر الزمردي تغطي: إعلانات بيع الفلل، جولات العقارات الافتراضية، منشورات السوشيال ميديا، كروت العمل، والعروض التقديمية للعملاء VIP.',
    features: [
      'أكثر من 350 قالب احترافي يمكن تعديل نصوصها وصورها بنقرة واحدة',
      'تعمل على الحساب المجاني تماماً في كانفا بدون الحاجة للاشتراك المدفوع',
      'خطوط عربية ملكية منتقاة بعناية لرفع معدلات التحويل والمصداقية',
      'تحديثات دورية مجانية وتوافق مع أحدث مقاسات منصات التواصل الاجتماعي'
    ],
    digitalDetails: {
      fileFormat: 'Canva Direct Shared Links (Lifetime Access)',
      fileSize: 'رابط مباشر فوري بعد الشراء',
      instantDownload: true,
      canvaEditable: true,
      compatibleApps: ['Canva App (iOS & Android)', 'Canva Web Browser']
    }
  },
  {
    id: 'royal-02',
    title: 'حقيبة المستشار المعتمد: التقييم العقاري والجدوى الاستثمارية 2026',
    subtitle: 'نماذج إكسل مالية ذكية لحساب العوائد (Cap Rate & ROI) + أدلة تثمين عقاري معتمدة',
    category: 'royal_collection',
    categoryLabel: 'التشكيلة الملكية',
    priceSAR: 1450,
    discountPriceSAR: 990,
    rating: 4.99,
    reviewsCount: 73,
    badgeText: 'نماذج مالية إكسل ذكية',
    isVipExclusive: true,
    imageUrl: LUXURY_ESTATE_VALUATION_IMAGE,
    description: 'الحقيبة الاستثمارية الأكثر طلباً من رجال الأعمال والمستثمرين في السوق الخليجي والأمريكي. تحتوي على نماذج إكسل ديناميكية لحساب العائد على الاستثمار، التدفقات النقدية الصافية، والتقييم العادل للعقارات السكنية والتجارية قبل الشراء.',
    features: [
      'حاسبة التدفق النقدي الذكية (Cash Flow & Cap Rate Calculator)',
      'نموذج تقييم مخاطر الشراء ومقارنة العوائد بين العقارات المحلية والدولية',
      'دليل إرشادي بصيغة PDF لأسرار المفاوضات العقارية واقتناص الصفقات',
      'ملفات Excel مفتوحة المصدر بالكامل مع معادلات حسابية جاهزة للاستخدام'
    ],
    digitalDetails: {
      fileFormat: 'Microsoft Excel (XLSX) + PDF Executive Guides',
      fileSize: '32 MB',
      instantDownload: true,
      compatibleApps: ['Microsoft Excel', 'Google Sheets', 'Numbers']
    }
  }
];

export { MOCK_BLOG_POSTS } from './blogData';
