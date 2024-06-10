import React, { useEffect, useState, useRef } from "react";
import contact from "../assets/123825 (1).jpg";
import smart from "../assets/icons8-smartphone-et-tablette-94.png";
import social from "../assets/icons8-message-chat-94.png";
import email from "../assets/icons8-email-94.png";
import { MdEmail, MdFacebook } from "react-icons/md";
import { RiInstagramFill } from "react-icons/ri";
import contactus from "../assets/9793476_4220713.jpg";
import Aos from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
function ContactUs() {
  const [name, setName] = useState("");
  const [emailit, setEmailit] = useState("");
  const [subject, setSubject] = useState("");
  const form = useRef();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const sendit = (e) => {
    e.preventDefault();
    if (
      name !== "" &&
      name !== " " &&
      emailit !== "" &&
      emailit !== " " &&
      subject !== "" &&
      subject !== " "
    ) {
      emailjs
        .sendForm(
          "service_6l2v93d",
          "template_3xzifqi",
          form.current,
          "L9kYqU2nbYGsFLvwb"
        )
        .then(
          (result) => {
            setName("");
            setEmailit("");
            setSubject("");
            toast.success("Votre email a été envoyé 👍", {
              position: "top-center",
              theme: "dark",
              autoClose: 2000,
            });
          },
          (error) => {
            toast.error("Quelque chose s'est mal passé 👎", {
              position: "top-center",
              theme: "dark",
              autoClose: 2000,
            });
          }
        );
    } else {
      toast.error("veuillez remplir tous les champs 👎", {
        position: "top-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  };
  useEffect(() => {
    Aos.init({
      duration: 2000,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  const trr = useSelector((state) => state.tran.tran);
  return (
    <div className=" overflow-hidden mb-[70px] ">
      <div className="   px-3 md:px-9 w-full  flex items-center relative overflow-hidden h-[60vh] mt-[115px] drop-shadow-2xl">
        <div className="w-full -z-20 h-full absolute top-0 left-0 bg-white"></div>
        <div className="w-full z-[-1] block md:hidden h-full absolute top-0 left-0 bg-[#00000081]"></div>
        {trr === "ar" ? (
          <div
            data-aos="fade-left"
            className=" -z-10 w-full md:w-[50%]  h-full  left-0 top-0 absolute md:rounded-tr-[150px] md:rounded-br-[300px] overflow-hidden"
          >
            <img
              src={contact}
              alt=""
              className="w-full h-full object-cover object-top"
            />
          </div>
        ) : (
          <div
            data-aos="fade-left"
            className=" -z-10 w-full md:w-[50%]  h-full right-0 top-0 absolute md:rounded-tl-[150px] md:rounded-bl-[300px] overflow-hidden"
          >
            <img
              src={contact}
              alt=""
              className="w-full h-full object-cover object-top"
            />
          </div>
        )}
        {trr === "ar" ? (
          <div className="w-[250px] h-[250px] -z-10 cust absolute bottom-[-100px] left-[52%] translate-x-[-50%] hidden md:block bg-fcolor"></div>
        ) : (
          <div className="w-[250px] h-[250px] -z-10 cust absolute bottom-[-100px] left-[50%] translate-x-[-50%] hidden md:block bg-fcolor"></div>
        )}
        <div className=" relative w-full md:w-[50%] md:text-start text-center">
          <h1
            data-aos="zoom-in"
            className="text-[45px] text-white md:text-fcolor  mb-10 font-extrabold"
          >
            {trr === "fr"
              ? "Entrer en contact"
              : trr === "eng"
              ? "Get in touch"
              : trr === "ar" && "ابقى على تواصل"}
          </h1>
          <p
            data-aos="fade-right"
            className="text-[20px] text-white md:text-fcolor font-bold mx-auto md:mx-0 max-w-[450px]"
          >
            {trr === "fr"
              ? "Souhaitez-vous entrer en contact? Nous aimerions avoir de vos nouvelles. Voici comment vous pouvez nous joindre..."
              : trr === "eng"
              ? "Would you like to get in touch? We would love to hear from you. Here's how you can reach us..."
              : trr === "ar" &&
                "هل ترغب في التواصل معنا؟ كنا نحب أن نسمع منك. إليك كيف يمكنك الوصول إلينا..."}
          </p>
        </div>
      </div>
      <div className="px-3 md:px-9 mt-[-35px] z-50 relative h-fit lg:h-[350px]   mb-[30px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 ">
          <motion.div
            key={1}
            transition={{ duration: 2, ease: "easeInOut" }}
            initial={{ height: 0, padding: 0 }}
            animate={{ height: "350px", padding: "16px" }}
            exit={{ height: 0 }}
            className="w-full  overflow-hidden bg-white shadow-lg shadow-slate-700 rounded-xl flex flex-col  gap-3"
          >
            <div className="flex justify-center items-center ">
              <img
                src={smart}
                alt=""
                className="w-[60px] h-[60px] object-cover"
              />
            </div>
            <h1 className="text-center font-extrabold text-[30px]  text-fcolor">
              {trr === "fr"
                ? "APPELEZ-NOUS"
                : trr === "eng"
                ? "CALL US"
                : trr === "ar" && "اتصل بنا"}
            </h1>
            <p className="text-[18px] text-center">
              {trr === "fr"
                ? "Intéressé par notre travail? Appelez-nous simplement pour en savoir plus sur nos services et nos prix"
                : trr === "eng"
                ? "Interested in our work? Just give us a call to find out more about our services and prices"
                : trr === "ar" &&
                  "هل أنت مهتم بعملنا؟ فقط اتصل بنا لمعرفة المزيد عن خدماتنا وأسعارنا"}
            </p>
            <div className="flex justify-between gap-2 items-center">
              <span className="text-[17px]  font-bold ">
                {trr === "fr"
                  ? "Service Client"
                  : trr === "eng"
                  ? "CUSTOMER SERVICE"
                  : trr === "ar" && "خدمة الزبائن"}
              </span>
              <p className="text-center text-[17px]  text-fcolor font-bold">
                07 72 72 67 66
              </p>
            </div>
            {/* <div className="flex justify-between gap-2 items-center">
              <span className="text-[17px]  font-bold ">
                R. Conception graphique
              </span>
              <p className="text-center text-[17px]  text-scolor font-bold">
                05 61 60 21 56
              </p>
            </div> */}
            {/* <div className="flex justify-between gap-2 items-center">
              <span className="text-[17px]  font-bold ">
                G. Réseaux sociaux
              </span>
              <p className="text-center text-[17px]  text-scolor font-bold">
                06 64 96 02 92
              </p>
            </div> */}
            {/* <p className="text-center text-xl text-scolor font-bold">
              05 61 60 21 56
            </p>
            <p className="text-center text-xl text-scolor font-bold">
              06 64 96 02 92
            </p> */}
          </motion.div>
          <motion.div
            key={2}
            transition={{ duration: 2, ease: "easeInOut" }}
            initial={{ height: 0, padding: 0 }}
            animate={{ height: "350px", padding: "16px" }}
            exit={{ height: 0 }}
            className="w-full overflow-hidden  bg-white shadow-lg shadow-slate-700 rounded-xl flex flex-col gap-3"
          >
            <div className="flex justify-center items-center ">
              <img
                src={social}
                alt=""
                className="w-[60px] h-[60px] object-cover"
              />
            </div>
            <h1 className="text-center font-bold text-[30px] text-fcolor uppercase">
              {trr === "fr"
                ? "RÉSEAUX SOCIAUX"
                : trr === "eng"
                ? "SOCIAL MEDIA"
                : trr === "ar" && "وسائل التواصل الاجتماعي"}
            </h1>
            <p className="text-[20px] text-center">
              {trr === "fr"
                ? "Vous pouvez nous suivre pour les choses à venir, ou nous contacter sur nos réseaux sociaux"
                : trr === "eng"
                ? "You can follow us for upcoming things, or contact us on our Social Media"
                : trr === "ar" &&
                  "يمكنك متابعتنا للأشياء القادمة ، أو الاتصال بنا على وسائل التواصل الاجتماعي الخاصة بنا"}
            </p>
            <a
              href="https://www.facebook.com/people/Daniila-Style/61554950011066/"
              target="_blank"
              rel="noreferrer"
              className=" text-xl font-bold flex items-center gap-3 text-black hover:text-fcolor justify-center transition-all duration-300 ease-in-out "
            >
              <MdFacebook className="text-2xl" />
              Daniila Style
            </a>
            <a
              href="https://www.instagram.com/daniila.style/"
              target="_blank"
              rel="noreferrer"
              className=" text-xl font-bold flex items-center gap-3 hover:text-fcolor text-black justify-center transition-all duration-300 ease-in-out "
            >
              <RiInstagramFill className="text-2xl" />
              Daniila Style
            </a>
          </motion.div>
          <motion.div
            key={3}
            transition={{ duration: 2, ease: "easeInOut" }}
            initial={{ height: 0, padding: 0 }}
            animate={{ height: "350px", padding: "16px" }}
            exit={{ height: 0 }}
            className="w-full overflow-hidden bg-white shadow-lg shadow-slate-700 rounded-xl flex flex-col  gap-3"
          >
            <div className="flex justify-center items-center ">
              <img
                src={email}
                alt=""
                className="w-[60px] h-[60px] object-cover"
              />
            </div>
            <h1 className="text-center font-extrabold text-[30px] uppercase text-fcolor">
              {trr === "fr"
                ? "ENVOYEZ UN E-MAIL"
                : trr === "eng"
                ? "SEND AN E-MAIL"
                : trr === "ar" && "أرسل بريدا إلكترونيا"}
            </h1>
            <p className="text-[20px] text-center">
              {trr === "fr"
                ? "pour une manière plus professionnelle. vous pouvez nous envoyer un email et nous ferons de notre mieux pour vous répondre aussi vite que possible"
                : trr === "eng"
                ? "for a more professional way. you can send us an email and we will do our best to answer you as soon as possible"
                : trr === "ar" &&
                  "لطريقة أكثر احترافية. يمكنك مراسلتنا عبر البريد الإلكتروني وسنبذل قصارى جهدنا للرد عليك في أقرب وقت ممكن"}
            </p>
            <p className="text-center text-xl text-fcolor font-bold flex items-center justify-center gap-3">
              <MdEmail />
              daniila.style@gmail.com
            </p>
          </motion.div>
        </div>
      </div>
      <div className=" px-3 md:px-9 w-full mt-20 ">
        <div className="flex justify-center ">
          <h1
            data-aos="zoom-out"
            data-aos-duration="1000"
            data-aos-easing="ease-in-sine"
            className="tsts font-extrabold mb-[70px] text-[40px] md:text-[50px]   "
          >
            {trr === "fr"
              ? "E-mail Rapide"
              : trr === "eng"
              ? "Quick E-mail"
              : trr === "ar" && "البريد الإلكتروني السريع"}
          </h1>
        </div>
        <div className="w-full flex flex-wrap xl:items-center ">
          <div data-aos="fade-right" className="w-full xl:w-[50%]  ">
            <img
              src={contactus}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div data-aos="fade-left" className="w-full xl:w-[50%] ">
            <div className="bg-white w-[95%] mx-auto border-2 border-fcolor rounded-3xl p-[14px] shadow-xl">
              <h1 className=" capitalize text-center text-2xl sm:text-[30px] text-fcolor font-extrabold mb-2">
                {trr === "fr"
                  ? "Envoyez-nous un e-mail"
                  : trr === "eng"
                  ? "Send us an e-mail"
                  : trr === "ar" && "مراسلتنا على البريد الاليكتروني"}
              </h1>
              <form ref={form} onSubmit={(e) => sendit(e)} className="w-full ">
                <label className="block mb-2">
                  <span className=" text-fcolor font-bold after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg  ">
                    {trr === "fr"
                      ? "Nom"
                      : trr === "eng"
                      ? "Name"
                      : trr === "ar" && "اسم"}
                  </span>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                    name="to_name"
                    className="mt-1 px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
                    placeholder="...."
                  />
                </label>
                <label className="block mb-2">
                  <span className="text-fcolor font-bold after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg  ">
                    {trr === "ar" ? "بريد إلكتروني" : "Email"}
                  </span>
                  <input
                    onChange={(e) => setEmailit(e.target.value)}
                    value={emailit}
                    type="email"
                    name="from_name"
                    className=" peer  mt-1 px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block w-full rounded-md sm:text-lg focus:ring-1"
                    placeholder="you@example.com"
                  />
                  <p className="mt-1 invisible peer-invalid:visible text-white text-md">
                    {trr === "fr"
                      ? "Veuillez fournir une adresse e-mail valide."
                      : trr === "eng"
                      ? "Please provide a valid email address."
                      : trr === "ar" && "يرجى تقديم عنوان بريد إلكتروني صالح"}
                  </p>
                </label>
                <label className="block mb-3">
                  <span className="text-fcolor font-bold after:content-['*'] after:ml-0.5 after:text-red-500 block text-lg  ">
                    {trr === "fr"
                      ? "Votre Message"
                      : trr === "eng"
                      ? "Message"
                      : trr === "ar" && "رسالة"}
                  </span>
                  <textarea
                    onChange={(e) => setSubject(e.target.value)}
                    value={subject}
                    name="message"
                    className="w-full h-[100px] rounded-md sm:text-lg resize-none p-2  mt-1 px-3 py-3 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-fcolor focus:ring-fcolor block  focus:ring-1"
                    placeholder="Saisissez votre message"
                  />
                </label>
                <button
                  type="submit"
                  className=" text-lg font-bold transition-all duration-300 ease-in-out hover:bg-fcolor hover:text-white w-[200px] h-[40px] rounded-2xl bg-white text-fcolor border-fcolor border mx-auto flex items-center justify-center"
                >
                  {trr === "fr"
                    ? "Envoyer"
                    : trr === "eng"
                    ? "Send"
                    : trr === "ar" && "إرسال"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
