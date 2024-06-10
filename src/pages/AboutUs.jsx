import React, { useEffect } from "react";
import img from "../assets/3558.jpg";
import { useSelector } from "react-redux";
import Aos from "aos";
import "aos/dist/aos.css";
import { useLocation } from "react-router-dom";
function AboutUs() {
  useEffect(() => {
    Aos.init();
  }, []);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const trr = useSelector((state) => state.tran.tran);
  return (
    <div className=" mb-[70px]">
      <div className="px-3 md:px-9 w-full mt-[115px] flex justify-center items-center h-[250px] bg-fcolor">
        <h1
          data-aos="zoom-in"
          data-aos-easing="ease-in-sine"
          className=" text-[35px] font-extrabold md:text-[80px] text-white"
        >
          {trr === "fr"
            ? "À propos de nous"
            : trr === "eng"
            ? "ABOUT US"
            : trr === "ar" && "معلومات عنا"}
        </h1>
      </div>
      <div className="px-3 md:px-9 w-full mt-[70px] gap-10 grid grid-cols-1 md:grid-cols-2 ">
        <div
          data-aos="fade-right"
          className="w-full px-5 py-10  bg-gray-200 rounded-lg"
        >
          <h1 className=" font-extrabold text-[30px] text-center mb-5">
            {trr === "fr"
              ? "À Propos de l'Entreprise:"
              : trr === "eng"
              ? "About Company:"
              : trr === "ar" && "عن الشركة:"}
          </h1>
          <p className="text-center max-w-[400px] text-[18px] mx-auto leading-9">
            {trr === "fr"
              ? "Danila est un site de commerce électronique spécialisé dans la vente d'une large gamme de vêtements, chaussures et accessoires pour hommes, femmes et enfants. Nous proposons une sélection de produits de haute qualité de grandes marques pour fournir à nos clients les dernières tendances et styles de mode."
              : trr === "eng"
              ? "Danila is an e-commerce website that specializes in selling a wide range of clothes, shoes, and accessories for men, women, and children. We offer a curated selection of high-quality products from top brands to provide our customers with the latest fashion trends and styles."
              : trr === "ar" &&
                "DaniLA هو موقع للتجارة الإلكترونية متخصص في بيع مجموعة واسعة من الملابس والأحذية والإكسسوارات للرجال والنساء والأطفال. نحن نقدم مجموعة مختارة من المنتجات عالية الجودة من أفضل العلامات التجارية لتزويد عملائنا بأحدث اتجاهات وأنماط الموضة."}
          </p>
        </div>
        <div
          data-aos="fade-left"
          data-aos-easing="ease-in-sine"
          className="w-full px-5 py-10  bg-gray-200 rounded-lg"
        >
          <h1 className=" font-extrabold text-[30px] text-center mb-5">
            {trr === "fr"
              ? "Équipe:"
              : trr === "eng"
              ? "Team:"
              : trr === "ar" && "الفريق:"}
          </h1>

          <p className="text-center max-w-[400px] text-[18px] mx-auto leading-9 mt-5">
            {trr === "fr"
              ? "- Chez Danila, nous avons une équipe dédiée de professionnels passionnés par la mode et déterminés à offrir la meilleure expérience d'achat à nos clients. Les membres de notre équipe apportent un large éventail de compétences et d'expertises, travaillant ensemble pour assurer le succès et la croissance de notre entreprise."
              : trr === "eng"
              ? "-At Danila, we have a dedicated team of professionals who are passionate about fashion and committed to providing the best shopping experience for our customers. Our team members bring a diverse range of skills and expertise to the table, working together to ensure the success and growth of our company."
              : trr === "ar" &&
                "- في DaniLA، لدينا فريق متخصص من المهنيين الذين هم متحمسون للأزياء وملتزمون بتقديم أفضل تجربة تسوق لعملائنا. يجلب أعضاء فريقنا مجموعة متنوعة من المهارات والخبرات إلى الطاولة ، ويعملون معا لضمان نجاح ونمو شركتنا."}
          </p>
        </div>
      </div>
      <div className="w-full h-[400px] relative mt-[70px]">
        <div className=" absolute w-full h-full bg-[#00000077] z-[10]"></div>
        <img
          src={img}
          className=" absolute top-0 left-0 w-full h-full object-cover object-top "
          alt=""
        />
      </div>
      <div className="px-3 md:px-9 w-full mt-[70px] gap-10 grid grid-cols-1 md:grid-cols-2 ">
        <div
          data-aos="fade-right"
          data-aos-easing="ease-in-sine"
          className="w-full px-5 py-10  bg-gray-200 rounded-lg"
        >
          <h1 className=" font-extrabold text-[30px] text-center mb-5">
            {trr === "fr"
              ? "Valeurs Fondamentales:"
              : trr === "eng"
              ? "Core Values:"
              : trr === "ar" && "القيم الأساسية:"}
          </h1>
          <p className="text-center max-w-[400px] text-[18px] mx-auto leading-9 mb-5">
            {trr === "fr"
              ? "- Satisfaction du client: Nous priorisons les besoins et les préférences de nos clients et nous nous efforçons de dépasser leurs attentes en fournissant des produits et services exceptionnels."
              : trr === "eng"
              ? "- Customer Satisfaction: We prioritize the needs and preferences of our customers and strive to exceed their expectations by providing exceptional products and services."
              : trr === "ar" &&
                "- رضا العملاء: نحن نعطي الأولوية لاحتياجات وتفضيلات عملائنا ونسعى جاهدين لتجاوز توقعاتهم من خلال تقديم منتجات وخدمات استثنائية."}
          </p>
          <p className="text-center max-w-[400px] text-[18px] mx-auto leading-9 mb-5">
            {trr === "fr"
              ? "- Qualité et authenticité: Nous nous engageons à n'offrir que des produits authentiques et de haute qualité de marques réputées pour assurer la satisfaction et la confiance des clients."
              : trr === "eng"
              ? "- Quality and Authenticity: We are committed to offering only genuine and high-quality products from reputable brands to ensure customer satisfaction and trust."
              : trr === "ar" &&
                "- الجودة والأصالة: نحن ملتزمون بتقديم منتجات أصلية وعالية الجودة فقط من العلامات التجارية ذات السمعة الطيبة لضمان رضا العملاء وثقتهم."}
          </p>
          <p className="text-center max-w-[400px] text-[18px] mx-auto leading-9 mb-5">
            {trr === "fr"
              ? "- Innovation et adaptabilité: Nous adoptons l'innovation et recherchons continuellement de nouvelles façons d'améliorer notre expérience d'achat en ligne et de rester en avance sur les tendances de l'industrie."
              : trr === "eng"
              ? "- Innovation and Adaptability: We embrace innovation and continuously seek new ways to enhance our online shopping experience and stay ahead of industry trends."
              : trr === "ar" &&
                "- الابتكار والقدرة على التكيف: نحن نحتضن الابتكار ونبحث باستمرار عن طرق جديدة لتعزيز تجربة التسوق عبر الإنترنت والبقاء في صدارة اتجاهات الصناعة."}
          </p>
          <p className="text-center max-w-[400px] text-[18px] mx-auto leading-9 mb-5">
            {trr === "fr"
              ? "- Intégrité et transparence: Nous menons nos activités avec honnêteté, intégrité et transparence, renforçant la confiance et la crédibilité auprès de nos clients et partenaires."
              : trr === "eng"
              ? "- Integrity and Transparency: We conduct our business with honesty, integrity, and transparency, building trust and credibility with our customers and partners."
              : trr === "ar" &&
                "- النزاهة والشفافية: ندير أعمالنا بأمانة ونزاهة وشفافية ، ونبني الثقة والمصداقية مع عملائنا وشركائنا."}
          </p>
          <p className="text-center max-w-[400px] text-[18px] mx-auto leading-9 mb-5">
            {trr === "fr"
              ? "- Travail d'équipe et collaboration: Nous favorisons une culture de travail d'équipe et de collaboration entre nos employés, fournisseurs et partenaires pour atteindre des objectifs communs et obtenir des résultats exceptionnels."
              : trr === "eng"
              ? "- Teamwork and Collaboration: We foster a culture of teamwork and collaboration among our employees, suppliers, and partners to achieve common goals and deliver exceptional results."
              : trr === "ar" &&
                "- العمل الجماعي والتعاون: نحن نعزز ثقافة العمل الجماعي والتعاون بين موظفينا وموردينا وشركائنا لتحقيق الأهداف المشتركة وتحقيق نتائج استثنائية."}
          </p>
        </div>
        <div
          data-aos="fade-left"
          data-aos-easing="ease-in-sine"
          className="w-full px-5 py-10  bg-gray-200 rounded-lg"
        >
          <h1 className=" font-extrabold text-[30px] text-center mb-5">
            {trr === "fr"
              ? "Mission et Vision:"
              : trr === "eng"
              ? "Mission and Vision:"
              : trr === "ar" && "الرسالة والرؤية:"}
          </h1>
          <p className="text-center max-w-[400px] text-[18px] mx-auto leading-9">
            {trr === "fr"
              ? "- Notre mission chez Danila est de fournir à nos clients une expérience d'achat pratique et agréable en proposant une gamme diversifiée de produits à des prix compétitifs. Nous visons à devenir une destination en ligne de premier plan pour les amateurs de mode à la recherche de vêtements, chaussures et accessoires à la mode et abordables."
              : trr === "eng"
              ? "- Our mission at Danila is to provide our customers with a convenient and enjoyable shopping experience by offering a diverse range of products at competitive prices. We aim to become a leading online destination for fashion enthusiasts looking for trendy and affordable clothing, footwear, and accessories."
              : trr === "ar" &&
                "- مهمتنا في DaniLA هي تزويد عملائنا بتجربة تسوق مريحة وممتعة من خلال تقديم مجموعة متنوعة من المنتجات بأسعار تنافسية. نهدف إلى أن نصبح وجهة رائدة على الإنترنت لعشاق الموضة الذين يبحثون عن الملابس والأحذية والإكسسوارات العصرية وبأسعار معقولة."}
          </p>
          <p className="text-center max-w-[400px] text-[18px] mx-auto leading-9 mt-5">
            {trr === "fr"
              ? "-Notre vision est de faire de Danila une plate-forme de commerce électronique fiable et fiable qui répond aux besoins de la mode des individus de tous âges et préférences. Nous nous efforçons d'améliorer continuellement nos services et d'élargir notre offre de produits pour répondre aux demandes en constante évolution de nos clients."
              : trr === "eng"
              ? "- Our Our vision is to establish Danila as a trusted and reliable e-commerce platform that caters to the fashion needs of individuals of all ages and preferences. We strive to continuously improve our services and expand our product offerings to meet the evolving demands of our customers."
              : trr === "ar" &&
                "- رؤيتنا هي إنشاء دانيلا كمنصة تجارة إلكترونية موثوقة وموثوقة تلبي احتياجات الأزياء للأفراد من جميع الأعمار والتفضيلات. نحن نسعى جاهدين لتحسين خدماتنا باستمرار وتوسيع عروض منتجاتنا لتلبية المتطلبات المتطورة لعملائنا."}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
