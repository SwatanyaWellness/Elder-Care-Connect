import { useState, useEffect } from 'react';
import { X, MessageCircle, Send } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const WHATSAPP_NUMBER = '919876543210'; // Replace with your actual WhatsApp number (country code + number, no +)

const WHATSAPP_MESSAGES: Record<string, string> = {
  en: "Hello! I'm interested in Swatanya Wellness services for my elderly family member. Can you help me?",
  hi: "नमस्ते! मुझे अपने बुजुर्ग परिवार के सदस्य के लिए स्वतंय्या वेलनेस सेवाओं में रुचि है। क्या आप मेरी मदद कर सकते हैं?",
  ta: "வணக்கம்! என் முதியோர் குடும்ப உறுப்பினருக்கான சேவைகளில் ஆர்வமாக உள்ளேன். உதவ முடியுமா?",
  te: "నమస్కారం! నా వృద్ధ కుటుంబ సభ్యుడికి Swatanya Wellness సేవలపై ఆసక్తి ఉంది. సహాయం చేయగలరా?",
  kn: "ನಮಸ್ಕಾರ! ನನ್ನ ಹಿರಿಯ ಕುಟುಂಬದ ಸದಸ್ಯರಿಗಾಗಿ Swatanya Wellness ಸೇವೆಗಳಲ್ಲಿ ಆಸಕ್ತಿ ಇದೆ. ಸಹಾಯ ಮಾಡಬಹುದೇ?",
  ml: "നമസ്കാരം! എന്റെ മുതിർന്ന കുടുംബാംഗത്തിന് Swatanya Wellness സേവനങ്ങൾ ആവശ്യമാണ്. സഹായിക്കാമോ?",
  mr: "नमस्कार! माझ्या वृद्ध कुटुंबातील सदस्यासाठी Swatanya Wellness सेवांमध्ये मला स्वारस्य आहे. मदत करू शकता का?",
  gu: "નમસ્તે! મારા વૃદ્ધ પરિવારના સભ્ય માટે Swatanya Wellness સેવાઓમાં રસ છે. શું તમે મદદ કરી શકો?",
  bn: "নমস্কার! আমার বয়স্ক পরিবারের সদস্যের জন্য Swatanya Wellness পরিষেবায় আগ্রহী। সাহায্য করতে পারবেন?",
  pa: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਨੂੰ ਆਪਣੇ ਬਜ਼ੁਰਗ ਪਰਿਵਾਰਕ ਮੈਂਬਰ ਲਈ Swatanya Wellness ਸੇਵਾਵਾਂ ਵਿੱਚ ਦਿਲਚਸਪੀ ਹੈ। ਕੀ ਤੁਸੀਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹੋ?",
  ur: "السلام علیکم! میں اپنے بزرگ خاندانی رکن کے لیے Swatanya Wellness خدمات میں دلچسپی رکھتا ہوں۔ کیا آپ مدد کر سکتے ہیں؟",
};

const CHAT_GREETING: Record<string, string> = {
  en: "Hi there! 👋 How can we help you today?",
  hi: "नमस्ते! 👋 हम आज आपकी कैसे सहायता कर सकते हैं?",
  ta: "வணக்கம்! 👋 இன்று நாங்கள் உங்களுக்கு எவ்வாறு உதவலாம்?",
  te: "నమస్కారం! 👋 మేము మీకు ఏమి సహాయం చేయగలం?",
  kn: "ನಮಸ್ಕಾರ! 👋 ನಾವು ಇಂದು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
  ml: "നമസ്കാരം! 👋 ഞങ്ങൾ ഇന്ന് നിങ്ങളെ എങ്ങനെ സഹായിക്കാം?",
  mr: "नमस्कार! 👋 आज आम्ही तुम्हाला कशी मदत करू शकतो?",
  gu: "નમસ્તે! 👋 આજે અમે તમને કેવી રીતે મદદ કરી શકીએ?",
  bn: "নমস্কার! 👋 আজ আমরা কীভাবে আপনাকে সাহায্য করতে পারি?",
  pa: "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ! 👋 ਅਸੀਂ ਅੱਜ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦੇ ਹਾਂ?",
  ur: "السلام علیکم! 👋 آج ہم آپ کی کیسے مدد کر سکتے ہیں؟",
};

const CHAT_SUBTITLE: Record<string, string> = {
  en: "Chat with us on WhatsApp for quick answers",
  hi: "त्वरित उत्तरों के लिए WhatsApp पर हमसे चैट करें",
  ta: "விரைவான பதில்களுக்கு WhatsApp-ல் எங்களுடன் பேசுங்கள்",
  te: "త్వరిత సమాధానాల కోసం WhatsApp లో మాతో మాట్లాడండి",
  kn: "ತ್ವರಿತ ಉತ್ತರಗಳಿಗಾಗಿ WhatsApp ನಲ್ಲಿ ನಮ್ಮೊಂದಿಗೆ ಚಾಟ್ ಮಾಡಿ",
  ml: "വേഗത്തിലുള്ള ഉത്തരങ്ങൾക്ക് WhatsApp-ൽ ഞങ്ങളുമായി ചാറ്റ് ചെയ്യുക",
  mr: "जलद उत्तरांसाठी WhatsApp वर आमच्याशी चॅट करा",
  gu: "ઝડપી જવાબો માટે WhatsApp પર અમારી સાથે ચેટ કરો",
  bn: "দ্রুত উত্তরের জন্য WhatsApp-এ আমাদের সাথে চ্যাট করুন",
  pa: "ਤੇਜ਼ ਜਵਾਬਾਂ ਲਈ WhatsApp 'ਤੇ ਸਾਡੇ ਨਾਲ ਚੈਟ ਕਰੋ",
  ur: "فوری جوابات کے لیے WhatsApp پر ہم سے چیٹ کریں",
};

const CHAT_BTN: Record<string, string> = {
  en: "Start WhatsApp Chat",
  hi: "WhatsApp चैट शुरू करें",
  ta: "WhatsApp அரட்டையை தொடங்கு",
  te: "WhatsApp చాట్ ప్రారంభించండి",
  kn: "WhatsApp ಚಾಟ್ ಪ್ರಾರಂಭಿಸಿ",
  ml: "WhatsApp ചാറ്റ് ആരംഭിക്കുക",
  mr: "WhatsApp चॅट सुरू करा",
  gu: "WhatsApp ચેટ શરૂ કરો",
  bn: "WhatsApp চ্যাট শুরু করুন",
  pa: "WhatsApp ਚੈਟ ਸ਼ੁਰੂ ਕਰੋ",
  ur: "WhatsApp چیٹ شروع کریں",
};

const QUICK_REPLIES: Record<string, string[]> = {
  en: ["Book a caregiver", "Know the pricing", "Emergency help", "Services in my city"],
  hi: ["देखभालकर्ता बुक करें", "मूल्य जानें", "आपातकालीन सहायता", "मेरे शहर में सेवाएं"],
  ta: ["பராமரிப்பாளரை பதிவு செய்யுங்கள்", "விலை அறிவுங்கள்", "அவசர உதவி", "என் நகரில் சேவைகள்"],
  te: ["కేర్‌గివర్‌ని బుక్ చేయండి", "ధర తెలుసుకోండి", "అత్యవసర సహాయం", "నా నగరంలో సేవలు"],
  kn: ["ಆರೈಕೆದಾರರನ್ನು ಬುಕ್ ಮಾಡಿ", "ಬೆಲೆ ತಿಳಿಯಿರಿ", "ತುರ್ತು ಸಹಾಯ", "ನನ್ನ ನಗರದಲ್ಲಿ ಸೇವೆಗಳು"],
  ml: ["ഒരു കെയർഗിവറെ ബുക്ക് ചെയ്യൂ", "വില അറിയൂ", "അടിയന്തര സഹായം", "എന്റെ നഗരത്തിൽ സേവനങ്ങൾ"],
  mr: ["काळजीवाहक बुक करा", "किंमत जाणून घ्या", "आपत्कालीन मदत", "माझ्या शहरात सेवा"],
  gu: ["કેરગિવર બુક કરો", "કિંમત જાણો", "કટોકટી સહાય", "મારા શહેરમાં સેવાઓ"],
  bn: ["একজন কেয়ারগিভার বুক করুন", "মূল্য জানুন", "জরুরি সাহায্য", "আমার শহরে সেবা"],
  pa: ["ਕੇਅਰਗਿਵਰ ਬੁੱਕ ਕਰੋ", "ਕੀਮਤ ਜਾਣੋ", "ਐਮਰਜੈਂਸੀ ਸਹਾਇਤਾ", "ਮੇਰੇ ਸ਼ਹਿਰ ਵਿੱਚ ਸੇਵਾਵਾਂ"],
  ur: ["نگہداشت کار بک کریں", "قیمت جانیں", "ہنگامی مدد", "میرے شہر میں خدمات"],
};

export default function WhatsAppChat() {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowBubble(true), 4000);
    return () => clearTimeout(timer);
  }, []);

  const openWhatsApp = (customMsg?: string) => {
    const msg = encodeURIComponent(customMsg ?? WHATSAPP_MESSAGES[lang] ?? WHATSAPP_MESSAGES.en);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  const quickReplies = QUICK_REPLIES[lang] ?? QUICK_REPLIES.en;
  const greeting = CHAT_GREETING[lang] ?? CHAT_GREETING.en;
  const subtitle = CHAT_SUBTITLE[lang] ?? CHAT_SUBTITLE.en;
  const btnLabel = CHAT_BTN[lang] ?? CHAT_BTN.en;

  return (
    <>
      {/* Floating notification bubble */}
      {showBubble && !open && (
        <div
          className="fixed bottom-24 right-6 z-40 max-w-xs animate-in slide-in-from-bottom-4 fade-in duration-300"
          onClick={() => { setOpen(true); setShowBubble(false); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl p-4 cursor-pointer border border-green-100 flex items-start gap-3 group hover:shadow-xl transition-shadow">
            <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-sm">
              <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.486c-.072.272.178.522.45.45l5.641-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.015-1.373l-.36-.214-3.727.972.992-3.628-.236-.374A9.818 9.818 0 012.182 12c0-5.424 4.394-9.818 9.818-9.818 5.424 0 9.818 4.394 9.818 9.818 0 5.424-4.394 9.818-9.818 9.818z"/></svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900">Swatanya Wellness</p>
              <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{greeting}</p>
            </div>
            <button
              className="text-gray-400 hover:text-gray-600 transition-colors -mt-1 -mr-1"
              onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Chat popup panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          {/* Header */}
          <div className="bg-[#075E54] px-4 py-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-white/20 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.486c-.072.272.178.522.45.45l5.641-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.015-1.373l-.36-.214-3.727.972.992-3.628-.236-.374A9.818 9.818 0 012.182 12c0-5.424 4.394-9.818 9.818-9.818 5.424 0 9.818 4.394 9.818 9.818 0 5.424-4.394 9.818-9.818 9.818z"/></svg>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#25D366] border-2 border-[#075E54]" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm">Swatanya Wellness</p>
              <p className="text-green-200 text-xs">● Online • Typically replies instantly</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat body */}
          <div
            className="bg-[#ECE5DD] px-4 py-5 space-y-3"
            style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9c0b4' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
          >
            {/* Agent message bubble */}
            <div className="flex items-start gap-2">
              <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center shrink-0 shadow-sm">
                <span className="text-white text-xs font-bold">SW</span>
              </div>
              <div className="bg-white rounded-2xl rounded-tl-none px-4 py-3 shadow-sm max-w-[85%]">
                <p className="text-gray-800 text-sm leading-relaxed">{greeting}</p>
                <p className="text-gray-500 text-xs mt-2 leading-relaxed">{subtitle}</p>
                <p className="text-gray-400 text-[10px] mt-2 text-right">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            {/* Quick reply chips */}
            <div className="space-y-2 pl-10">
              <p className="text-gray-500 text-xs font-medium">Quick options:</p>
              <div className="flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => openWhatsApp(reply)}
                    className="text-xs bg-white text-[#075E54] border border-[#25D366]/40 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all px-3 py-1.5 rounded-full shadow-sm font-medium"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer / CTA */}
          <div className="bg-white px-4 py-4 border-t border-gray-100">
            <button
              onClick={() => openWhatsApp()}
              className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20c05b] text-white font-semibold text-sm py-3 px-4 rounded-xl transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.486c-.072.272.178.522.45.45l5.641-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.015-1.373l-.36-.214-3.727.972.992-3.628-.236-.374A9.818 9.818 0 012.182 12c0-5.424 4.394-9.818 9.818-9.818 5.424 0 9.818 4.394 9.818 9.818 0 5.424-4.394 9.818-9.818 9.818z"/></svg>
              <span>{btnLabel}</span>
              <Send className="w-4 h-4 ml-1" />
            </button>
            <p className="text-center text-gray-400 text-[10px] mt-2">
              Powered by WhatsApp • End-to-end encrypted
            </p>
          </div>
        </div>
      )}

      {/* Floating toggle button */}
      <button
        onClick={() => { setOpen(!open); setShowBubble(false); }}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#20c05b] shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
        aria-label="Open WhatsApp chat"
      >
        {open ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.556 4.118 1.528 5.845L.057 23.486c-.072.272.178.522.45.45l5.641-1.471A11.943 11.943 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.015-1.373l-.36-.214-3.727.972.992-3.628-.236-.374A9.818 9.818 0 012.182 12c0-5.424 4.394-9.818 9.818-9.818 5.424 0 9.818 4.394 9.818 9.818 0 5.424-4.394 9.818-9.818 9.818z"/></svg>
        )}
        {/* Pulse ring */}
        {!open && (
          <span className="absolute w-14 h-14 rounded-full bg-[#25D366] animate-ping opacity-30 pointer-events-none" />
        )}
      </button>
    </>
  );
}
