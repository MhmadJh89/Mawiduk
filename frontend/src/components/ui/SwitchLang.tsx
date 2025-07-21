import  TranslateIcon  from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next';

const SwitchLang=()=>{
    const {i18n} = useTranslation();
    const toggleLang = () => {
        const newLang = i18n.language === 'ar' ? 'en' : 'ar';
        i18n.changeLanguage(newLang);
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    };
    return (
        <button onClick={toggleLang} className="text-sm font-medium underline">
            <TranslateIcon sx={{color: 'white'}}/>        
        </button>
    );
};

export default SwitchLang;