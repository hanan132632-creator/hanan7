import { ProductItem } from '../types';
import heroVillaImg from '../assets/images/hero_luxury_villa_1791003841235.jpg';
import luxuryPenthouseImg from '../assets/images/luxury_penthouse_1791003853037.jpg';
import gatheringGamesImg from '../assets/images/gathering_games_asset_1791003864897.jpg';
import blueprintsImg from '../assets/images/architectural_blueprints_1791003876626.jpg';
import canvaTemplatesImg from '../assets/images/canva_templates_bundle_1791003886695.jpg';
import privateEstateMansionImg from '../assets/images/private_estate_mansion_1791299404793.jpg';
import luxuryEstateValuationImg from '../assets/images/luxury_estate_valuation_1791299419965.jpg';

export const HERO_VILLA_IMAGE = heroVillaImg;
export const LUXURY_PENTHOUSE_IMAGE = luxuryPenthouseImg;
export const GATHERING_GAMES_IMAGE = gatheringGamesImg;
export const BLUEPRINTS_IMAGE = blueprintsImg;
export const CANVA_TEMPLATES_IMAGE = canvaTemplatesImg;
export const PRIVATE_ESTATE_MANSION_IMAGE = privateEstateMansionImg;
export const LUXURY_ESTATE_VALUATION_IMAGE = luxuryEstateValuationImg;

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
    id: 'game-01',
    title: 'مجموعة ألعاب الجمعات الذهبية - حزمة السهرة الملكية',
    subtitle: '12 لعبة ورقية وتفاعلية ذكية لليالي العائلية والجمعات',
    category: 'gathering_games',
    categoryLabel: 'ألعاب الجمعات',
    priceSAR: 149,
    discountPriceSAR: 99,
    rating: 4.92,
    reviewsCount: 142,
    badgeText: 'تنزيل فوري PDF & Print',
    isVipExclusive: false,
    imageUrl: GATHERING_GAMES_IMAGE,
    description: 'المطبوعة الأكثر مبيعاً في متجر المنتجات الرقمية! حزمة متكاملة تضم 12 لعبة تفاعلية مبتكرة للجمعات والمناسبات (تحديات، ألغاز ملكية، أسئلة الصراحة الفاخرة، وألعاب الضحك والألغاز الشعبية بأسلوب عصري). جاهزة للطباعة الفورية أو اللعب عبر الجوال مباشرة.',
    features: [
      'تنزيل مباشر بمجرد إتمام الدفع (PDF عالي الدقة)',
      'تتضمن بطاقات تفاعلية مصممة بالذهب والزمرد',
      'مناسبة لجميع الأعمار وتستوعب حتى 20 لاعب',
      'تحديثات مجانية دائمية للأسئلة والألغاز'
    ],
    digitalDetails: {
      fileFormat: 'PDF High Resolution & Interactive Web App',
      fileSize: '45 MB',
      instantDownload: true,
      playersCount: '2 - 20 لاعبين'
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
  }
];

export { MOCK_BLOG_POSTS } from './blogData';
