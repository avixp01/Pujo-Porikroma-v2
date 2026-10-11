import React, { useState, useEffect, useRef } from 'react';
import { X, Music, Search, Heart } from 'lucide-react';
import './SongListPopup.css';

export const pandalSongs = [
    { id: 0, title: 'Bolo Dugga Elo', artist: 'Sunidhi Chauhan', duration: '3:45', cover: '/bolo-dugga-elo-cover.jpg', src: '/songs/bolo-dugga-elo.mp3', youtubeId: 'https://youtu.be/avHnTk8lzzg?si=rT5-LnqXVRgRIUhC' },
    { id: 1, title: 'Dugga Elo', artist: 'Monali Thakur', duration: '2:30', cover: '/dugga-elo-cover.jpg', src: '/songs/dugga-elo.mp3', youtubeId: 'https://youtu.be/xlElO06nQy8?si=Th9khDcCX8bXaAX-' },
    { id: 2, title: 'Dhak Baja Kashor Baja', artist: 'Shreya Ghoshal', duration: '3:15', cover: '/dhak-baja-kashor-baja-cover.jpg', src: '/songs/dhak-baja-kashor-baja.mp3', youtubeId: 'https://youtu.be/id5_3dKvEBg?si=9iGImkylmhnhso4T' },
    { id: 3, title: 'Dholida', artist: 'LOVEYATRI', duration: '4:00', cover: '/dholida-cover.jpg', src: '/songs/dholida.mp3', youtubeId: 'https://youtu.be/rz1hAo3Hiy4?si=psJVmbLO7xhEw6b_' },
    { id: 4, title: 'Dhaker Taley', artist: 'Poran Jai Jolia Re', duration: '4:35', cover: '/dhaker-taley-cover.jpg', src: '/songs/dhaker-taley.mp3', youtubeId: 'https://youtu.be/hbXuXt7gkFY?si=4BqnUCOJxMrJkVZW' },
    { id: 5, title: 'Ebar Jeno Onno Rokom Pujo', artist: 'Yoddha', duration: '3:55', cover: '/ebar-jeno-cover.jpg', src: '/songs/ebar-jeno.mp3', youtubeId: 'https://youtu.be/E2zfQEo7Q_M?si=90iP_tJBiNroTWRK' },
    { id: 6, title: 'Dugga Ma', artist: 'Arijit Singh | Bolo Dugga Maiki', duration: '2:52', cover: '/dugga-ma-cover.jpg', src: '/songs/dugga-ma.mp3', youtubeId: 'https://youtu.be/sPuZ0Q3KDWo?si=jbBH48oUQjO8MYUm' },
    { id: 7, title: 'Aamaar Dugga', artist: 'Monali Thakur', duration: '3:16', cover: '/aamaar-dugga-cover.jpg', src: '/songs/aamaar-dugga.mp3', youtubeId: 'https://youtu.be/ml81ICj5wr4?si=HkS_U2f3_cx9Cion' },
    { id: 8, title: 'Kamariya', artist: 'Darshan Raval', duration: '3:07', cover: '/kamariya-cover.jpg', src: '/songs/kamariya.mp3', youtubeId: 'https://youtu.be/i0_m90T04uw?si=niCT2YVFEK_YDPXd' },
    { id: 9, title: 'Shundori Komola', artist: 'Villain', duration: '3:25', cover: '/shundori-komola-cover.jpg', src: '/songs/shundori-komola.mp3', youtubeId: 'https://youtu.be/E_6K3no0PD0?si=-gmI46OAPMEzFIOr' },
    { id: 10, title: 'Chogada', artist: 'Loveyatri', duration: '4:16', cover: '/chogada-cover.jpg', src: '/songs/chogada.mp3', youtubeId: 'https://youtu.be/asYxxtiWUyw?si=VddMDEohyXJ5DQwa' },
    { id: 11, title: 'Gouri Elo', artist: 'Raktabeej', duration: '3:12', cover: '/gouri-elo-cover.jpg', src: '/songs/gouri-elo.mp3', youtubeId: 'https://youtu.be/asdoVzpUFsE?si=ymeegSxSk8jlNt4G' },
    { id: 102, title: 'Rupang Dehi', artist: 'Snita Pramanik Ghosh', duration: '4:40', cover: '/rupang-dehi-cover.jpg', src: '/songs/rupang-dehi.mp3', youtubeId: 'https://youtu.be/IbDqRfeqjDo?si=rwC3xuOrAp9OSbAj' },
    { id: 103, title: 'Dhak Baaja Komor Nacha', artist: 'Switzerland', duration: '3:40', cover: '/dhak-baaja-cover.jpg', src: '/songs/dhak-baaja.mp3', youtubeId: 'https://youtu.be/G7CdEseBpwc?si=ltrZ0hged77Nobmc' },
    { id: 104, title: 'Shubhaarambh', artist: 'Kai Po Che', duration: '3:10', cover: '/shubhaarambh-cover.jpg', src: '/songs/shubhaarambh.mp3', youtubeId: 'https://youtu.be/Gx_Rqsq1DIw?si=vtkL5w7CSsYcUXO_' },
    { id: 105, title: 'Durge Durge Durgatinashini', artist: 'Asha Bhosle', duration: '5:27', cover: '/durge-durge-cover.jpg', src: '/songs/durge-durge.mp3', youtubeId: 'https://youtu.be/7szUbVq8arc?si=0sTi0Qb8Ee0gwZt-' },
    { id: 106, title: 'Nagada Sang Dhol', artist: 'Ram-Leela', duration: '4:30', cover: '/nagada-sang-dhol-cover.jpg', src: '/songs/nagada-sang-dhol.mp3', youtubeId: 'https://youtu.be/3X7x4Ye-tqo?si=lYxUboofB09t2JSw' },
    { id: 107, title: 'Saawariya', artist: 'Aastha Gill | Kumar Sanu', duration: '3:23', cover: '/saawariya-cover.jpg', src: '/songs/saawariya.mp3', youtubeId: 'https://youtu.be/Y5299jOaKQ4?si=GB3fDLwNiQjr_lx5' },
    { id: 108, title: 'Elo Je Maa', artist: 'Challenge 2', duration: '4:50', cover: '/elo-je-maa-cover.jpg', src: '/songs/elo-je-maa.mp3', youtubeId: 'https://youtu.be/GSJDim_JP4M?si=Ir5-0cA2nVXcK1yq' },
    { id: 109, title: 'Joy Joy Durga Maa', artist: 'Agnibha Bandyopadhyay', duration: '5:34', cover: '/joy-joy-durga-maa-cover.jpg', src: '/songs/joy-joy-durga-maa.mp3', youtubeId: 'https://youtu.be/2SRikuaYzqY?si=u0I9z129GvObP64Z' },
    { id: 110, title: 'Radhe Radhe', artist: 'Dream Girl', duration: '3:17', cover: '/radhe-radhe-cover.jpg', src: '/songs/radhe-radhe.mp3', youtubeId: 'https://youtu.be/13cHnQ1Suj8?si=2EZsqkpsTXNk8Zlh' },
    { id: 111, title: 'Dugga Elo', artist: 'Akriti Kakar', duration: '4:25', cover: '/dugga-elo-akriti-cover.jpg', src: '/songs/dugga-elo-akriti.mp3', youtubeId: 'https://youtu.be/xytF80lvSV8?si=inLdpzsokrf-W5jr' },
    { id: 112, title: 'Ekta Bindaas Para', artist: 'Ley Chakka', duration: '4:33', cover: '/ekta-bindaas-para-cover.jpg', src: '/songs/ekta-bindaas-para.mp3', youtubeId: 'https://youtu.be/wFBFISJ_M-o?si=jQWAoxMLfsDTYarF' },
    { id: 113, title: 'O Menoka O Menoka', artist: 'Akriti Kakkar', duration: '3:36', cover: '/o-menoka-cover.jpg', src: '/songs/o-menoka.mp3', youtubeId: 'https://youtu.be/xUMhpMmwAmM?si=QP_R9H-gwD_IpmdZ' },
    { id: 114, title: 'ABAR ELO MAA', artist: 'Rahul Dutta', duration: '3:11', cover: '/abar-elo-maa-cover.jpg', src: '/songs/abar-elo-maa.mp3', youtubeId: 'https://youtu.be/BNBTynbflog?si=QnamW9I004bv4Orl' },
    { id: 115, title: 'Sharatadin', artist: 'Yoddha', duration: '5:10', cover: '/sharatadin-cover.jpg', src: '/songs/sharatadin.mp3', youtubeId: 'https://youtu.be/DbXP1TqLwrs?si=KCid1MlhwVnRrMTX' },
    { id: 116, title: 'Ailo Uma Barite', artist: 'Monami Ghosh', duration: '4:20', cover: '/ailo-uma-barite-cover.jpg', src: '/songs/ailo-uma-barite.mp3', youtubeId: 'https://youtu.be/4zyCkmAS1Oo?si=C3wLmwECBow5Y5Up' },
    { id: 117, title: 'Uma Ashe Notun Saje', artist: 'Ankita Bhattacharyya', duration: '3:27', cover: '/uma-ashe-notun-saje-cover.jpg', src: '/songs/uma-ashe-notun-saje.mp3', youtubeId: 'https://youtu.be/hnkfDCbULxk?si=bUDQxGPQxr55Wff8' },
    { id: 118, title: 'Chirodini Tumi Je Aamar', artist: 'Kishore Kumar', duration: '7:02', cover: '/chirodini-cover.jpg', src: '/songs/chirodini.mp3', youtubeId: 'https://youtu.be/AJTkBqJXAv4?si=4ODNJU_jS7SiC7Rf' },
    { id: 119, title: 'Aar Koto Raat Eka Thakbo', artist: 'Asha Bhosle', duration: '5:53', cover: '/aar-koto-raat-cover.jpg', src: '/songs/aar-koto-raat.mp3', youtubeId: 'https://youtu.be/NNaRjh_Xrsc?si=O0Hic3KjFuvs_Hwn' },
    { id: 120, title: 'Ghaghro', artist: 'Rutvi Pandya', duration: '3:12', cover: '/ghaghro-cover.jpg', src: '/songs/ghaghro.mp3', youtubeId: 'https://youtu.be/p6_PJm9A4U4?si=nE7J58C2cfusBlzk' },
    { id: 121, title: 'Garbo', artist: 'Tanishk Bagchi', duration: '3:10', cover: '/garbo-cover.jpg', src: '/songs/garbo.mp3', youtubeId: 'https://youtu.be/65o5Q_SmIww?si=fAuoKar1dBxl2EzI' },
    { id: 122, title: 'Esho Maa Durga', artist: 'Shamik Guha Roy', duration: '4:06', cover: '/esho-maa-durga-cover.jpg', src: '/songs/esho-maa-durga.mp3', youtubeId: 'https://youtu.be/bQtuffhU6_4?si=cukPSB4ZjLzTrExy' },
    { id: 123, title: 'Dhitang Dhitang', artist: 'Love Express', duration: '3:23', cover: '/dhitang-dhitang-cover.jpg', src: '/songs/dhitang-dhitang.mp3', youtubeId: 'https://youtu.be/j87D8QMNe5k?si=EK5FpBu_sDBT1kJs' },
    { id: 124, title: 'Dhol Re Vagad', artist: 'Shivang, Shraddha', duration: '3:30', cover: '/dhol-re-vagad-cover.jpg', src: '/songs/dhol-re-vagad.mp3', youtubeId: 'https://youtu.be/sWMgVN2i8AE?si=c6z-r6L2dd0QEdHE' },
    { id: 125, title: 'Baja Sanai Aar Baja Re Dhol', artist: 'Deewana', duration: '4:25', cover: '/baja-sanai-cover.jpg', src: '/songs/baja-sanai.mp3', youtubeId: 'https://youtu.be/H9puHH3wlqs?si=mNwDY2gjRtY3zNOV' },
    { id: 126, title: 'Aigiri Nandini [Rock Version]', artist: 'Sowrabha Rao', duration: '4:53', cover: '/aigiri-nandini-cover.jpg', src: '/songs/aigiri-nandini.mp3', youtubeId: 'https://youtu.be/EbcdDXEPukk?si=I5x5Tf8KzeK2zPZi' },
    { id: 127, title: 'Aaj Baaje', artist: 'Somchanda Bhattacharya', duration: '3:30', cover: '/aaj-baaje-cover.jpg', src: '/songs/aaj-baaje.mp3', youtubeId: 'https://youtu.be/UpeueoYgHnE?si=s5EASQEURqsSC1RN' },
    { id: 128, title: 'Jaago Uma', artist: 'Rupankar', duration: '3:08', cover: '/jaago-uma-cover.jpg', src: '/songs/jaago-uma.mp3', youtubeId: 'https://youtu.be/OWhOsOHQjY0?si=vOqraSZiBWro5eQq' },
    { id: 129, title: 'Kesariyo Rang', artist: 'Lijo G, Dj Chetas', duration: '3:14', cover: '/kesariyo-rang-cover.jpg', src: '/songs/kesariyo-rang.mp3', youtubeId: 'https://youtu.be/rLsJlT-kV-I?si=MTgZFvCi4HANEUUa' },
    { id: 130, title: 'Maa Ashchhe', artist: 'Sanjeev Tiwari', duration: '4:14', cover: '/maa-ashchhe-cover.jpg', src: '/songs/maa-ashchhe.mp3', youtubeId: 'https://youtu.be/Icgq6OE7b30?si=RZ_eCxPnPDfApdeK' },
    { id: 131, title: 'Maa Go Tui', artist: 'Somchanda', duration: '2:08', cover: '/maa-go-tui-cover.jpg', src: '/songs/maa-go-tui.mp3', youtubeId: 'https://youtu.be/60tSbJWJCr0?si=LazCcDBHrGKOXLtN' },
    { id: 132, title: 'Bhole Baba(ভোলে বাবা)', artist: 'Badshah,Nikhita G', duration: '3:57', cover: '/bhole-baba-cover.jpg', src: '/songs/bhole-baba.mp3', youtubeId: 'https://youtu.be/dtWsgIGshOc?si=OskDliHXIdjEfEJP' },
    { id: 133, title: 'Dugga Mayer Joy', artist: 'Keshab Dey', duration: '3:01', cover: '/dugga-mayer-joy-cover.jpg', src: '/songs/dugga-mayer-joy.mp3', youtubeId: 'https://youtu.be/f1fbdXFGpLQ?si=ZSg42u6FbFq7otb2' },
    { id: 134, title: 'Dugga Eseche Ghore', artist: 'Keshab Dey', duration: '3:43', cover: '/dugga-eseche-ghore-cover.jpg', src: '/songs/dugga-eseche-ghore.mp3', youtubeId: 'https://youtu.be/Bu6V3uOVN10?si=0TmSG0tnnuR8vUWt' },
    { id: 135, title: 'Yoddhar Sathe Ebar Pujo Katan', artist: 'Yoddha', duration: '3:28', cover: '/yoddhar-sathe-cover.jpg', src: '/songs/yoddhar-sathe.mp3', youtubeId: 'https://youtu.be/tP6MIon3S5c?si=M7jABCX3Q2cWlXiB' },
    { id: 136, title: 'Pujor Dhaak Theme', artist: 'SUROBAIBHAB', duration: '1:30', cover: '/pujor-dhaak-theme-cover.jpg', src: '/songs/pujor-dhaak-theme.mp3', youtubeId: 'https://youtu.be/E40N8rKKTCc?si=B0WaHSDyzxi1A3Wq' },
    { id: 137, title: 'Bolo Dugga Maiki (বল দুগ্গা মাঈকি)', artist: 'Jeet Gannguli', duration: '3:51', cover: '/bolo-dugga-maiki-cover.jpg', src: '/songs/bolo-dugga-maiki.mp3', youtubeId: 'https://youtu.be/DGNCKijVhJc?si=TdcONVHyUlp1fWpL' },
    { id: 138, title: 'Pujo Pujo Gondho', artist: 'Anupam Roy', duration: '2:47', cover: '/pujo-pujo-gondho-cover.jpg', src: '/songs/pujo-pujo-gondho.mp3', youtubeId: 'https://youtu.be/haJg9VgzMM0?si=h76F5qZCvW79ETwm' },
    { id: 139, title: 'Dashabhuja', artist: 'Monali Thakur', duration: '4:05', cover: '/dashabhuja-cover.jpg', src: '/songs/dashabhuja.mp3', youtubeId: 'https://youtu.be/G9DnRI1J2wo?si=wcQo8hjz_UOt-lW2' },
    { id: 140, title: 'Joy Dugga Thakur(জয় দুগ্গা ঠাকুর)', artist: 'AnkushH NussratJ', duration: '4:53', cover: '/joy-dugga-thakur-cover.jpg', src: '/songs/joy-dugga-thakur.mp3', youtubeId: 'https://youtu.be/Xv9JcvNqmRM?si=Btv7r_BhUhx2-HBy' },
    { id: 141, title: 'Eseche Maa Durga Maa', artist: 'Keshab Dey', duration: '3:16', cover: '/eseche-maa-durga-maa-cover.png', src: '/songs/eseche-maa-durga-maa.mp3', youtubeId: 'https://youtu.be/vd9o0KPvnpI?si=hsCPHwfJ88vO05rG' },
    { id: 142, title: 'Pujor Gaan', artist: 'Poushali Bhattacharya', duration: '4:44', cover: '/pujor-gaan-cover.jpg', src: '/songs/pujor-gaan.mp3', youtubeId: 'https://youtu.be/srJlx60zfBQ?si=2jnTajM1qtfQFbVg' },
    { id: 143, title: 'Pujor Gaan 3.0', artist: 'STS PRODUCTION', duration: '4:28', cover: '/pujor-gaan-3-cover.jpg', src: '/songs/pujor-gaan-3.mp3', youtubeId: 'https://youtu.be/MXNmYVT8dtE?si=aL9ybLYePQvX6RCl' },
    { id: 144, title: 'Chaarpashe Aalo Hok', artist: 'SVF Music', duration: '12:21', cover: '/chaarpashe-aalo-hok-cover.jpg', src: '/songs/chaarpashe-aalo-hok.mp3', youtubeId: 'https://youtu.be/mDEzESGA0h8?si=ECSkWaH0xjpY7E2u' },
    { id: 145, title: 'Aham Rudre', artist: 'Academy of Music', duration: '2:38', cover: '/aham-rudre-cover.jpg', src: '/songs/aham-rudre.mp3', youtubeId: 'https://youtu.be/nH65Xk8kPjQ?si=D7Fmf_mQhSh6nfZm' },
    { id: 146, title: 'Elo Re Pujo Elo', artist: 'Dabbu', duration: '3:09', cover: '/elo-re-pujo-elo-cover.jpg', src: '/songs/elo-re-pujo-elo.mp3', youtubeId: 'https://youtu.be/UElpQ1D3CkA?si=Ih3j5QZtmpycbz-4' },
    { id: 147, title: 'O Thakur', artist: 'Upal Sengupta', duration: '2:53', cover: '/o-thakur-cover.jpg', src: '/songs/o-thakur.mp3', youtubeId: 'https://youtu.be/CYcqPK0Dl60?si=1LxDqRyGFD0lqqxh' },
    { id: 148, title: 'Dhol Bajaa', artist: 'DarshanRaval', duration: '3:32', cover: '/dhol-bajaa-cover.jpg', src: '/songs/dhol-bajaa.mp3', youtubeId: 'https://youtu.be/mjTZI-dnCbg?si=tUH1_5rFMEel32Ux' },
    { id: 149, title: 'Tomake Chai', artist: 'Gangster | Arijit Singh', duration: '4:34', cover: '/tomake-chai-cover.jpg', src: '/songs/tomake-chai.mp3', youtubeId: 'https://youtu.be/1f18irP--O8?si=WFhwiIeQjhNuh8kP' },
    { id: 150, title: 'Mehndi', artist: 'Dhvani Bhanushali', duration: '4:48', cover: '/mehndi-cover.png', src: '/songs/mehndi.mp3', youtubeId: 'https://youtu.be/YNtiHCseT3Q?si=fvHANPzV46BIeBbc' },
    { id: 151, title: 'Shubho Shubho', artist: 'Altamash Faridi', duration: '3:16', cover: '/shubho-shubho-cover.jpg', src: '/songs/shubho-shubho.mp3', youtubeId: 'https://youtu.be/6LuRHIXNF_A?si=fhFQSqKG-QdFu5Kb' },
    { id: 152, title: 'Debi Sajer Gaan', artist: 'Rupak Tiary', duration: '3:00', cover: '/debi-sajer-gaan-cover.jpg', src: '/songs/debi-sajer-gaan.mp3', youtubeId: 'https://youtu.be/BvIcx9ev8X0?si=vUU_cPpP6oKvTIxu' },
    { id: 153, title: 'Dholida Remix (Dj)', artist: 'Dj Manik', duration: '4:21', cover: '/dholida-remix-cover.png', src: '/songs/dholida-remix.mp3', youtubeId: 'https://youtu.be/mu-ceTpOwLk?si=siHQ6Q3T1ZGnlJSG' },
    { id: 154, title: 'He Maa Durga Maa', artist: 'Aseema Panda', duration: '3:16', cover: '/he-maa-durga-maa-cover.jpg', src: '/songs/he-maa-durga-maa.mp3', youtubeId: 'https://youtu.be/YnU9c1aj5hY?si=IyCXVXNxDtSLvHBB' },
    { id: 155, title: 'Durga Maa Eseche', artist: 'Akassh', duration: '3:07', cover: '/durga-maa-eseche-cover.jpg', src: '/songs/durga-maa-eseche.mp3', youtubeId: 'https://youtu.be/Ghem4nJZXwE?si=Brvtxa5q1gjur1kM' },
    { id: 156, title: 'Hote Paare Na', artist: 'Bolo Dugga Maiki', duration: '4:03', cover: '/hote-paare-na-cover.jpg', src: '/songs/hote-paare-na.mp3', youtubeId: 'https://youtu.be/OHarsDan3h4?si=C02Bh86Y5V_MAe8s' },
    { id: 157, title: 'Dugga Ma asche', artist: 'Infra', duration: '3:34', cover: '/dugga-ma-asche-cover.jpg', src: '/songs/dugga-ma-asche.mp3', youtubeId: 'https://youtu.be/FpM4yZfktnM?si=63V91QEzXRz6wEx8' },
    { id: 158, title: 'KOLKI', artist: 'Monami Ghosh', duration: '4:30', cover: '/kolki-cover.jpg', src: '/songs/kolki.mp3', youtubeId: 'https://youtu.be/R4eFnxOibPs?si=90b9YbAi7I7kEaQ7' },
    { id: 159, title: 'Mon Boleche Amar', artist: 'Love Express', duration: '4:01', cover: '/mon-boleche-amar-cover.jpg', src: '/songs/mon-boleche-amar.mp3', youtubeId: 'https://youtu.be/DKx8Tc5eY2E?si=PwEfPUh1Y_qajo8Y' },
    { id: 160, title: 'Maa Eseche - Remix', artist: 'Dj Suman Raj', duration: '3:04', cover: '/maa-eseche-remix-cover.jpg', src: '/songs/maa-eseche-remix.mp3', youtubeId: 'https://youtu.be/0Hlh7TFv-uE?si=G4iA9sEIt3G3H-i9' },
    { id: 161, title: 'O Lolona', artist: 'Parbona Ami Chharte Toke', duration: '4:01', cover: '/o-lolona-cover.jpg', src: '/songs/o-lolona.mp3', youtubeId: 'https://youtu.be/eu4bFk_17Jw?si=tAR5XFnQgOSra36N' },
    { id: 162, title: 'Meri Maa Ke Barabar Koi Nahi', artist: 'Jubin N & Payal D', duration: '5:15', cover: '/meri-maa-ke-barabar-koi-nahi-cover.jpg', src: '/songs/meri-maa-ke-barabar-koi-nahi.mp3', youtubeId: 'https://youtu.be/zkO8HfmRsD0?si=d-iN2_LsGgh7fPj7' },
    { id: 163, title: 'Madhukaitava Vidhwangsi', artist: 'Tushar Dutta', duration: '9:48', cover: '/madhukaitava-vidhwangsi-cover.jpg', src: '/songs/madhukaitava-vidhwangsi.mp3', youtubeId: 'https://youtu.be/_GUdZJQun2I?si=EGaEQf4E9vLL9SxK' },
    { id: 164, title: 'Bajlo Tomar Aalor Benu With Narration', artist: 'Birendra Krishna Bhadra', duration: '4:41', cover: '/bajlo-tomar-aalor-benu-with-narration-cover.jpg', src: '/songs/bajlo-tomar-aalor-benu-with-narration.mp3', youtubeId: 'https://youtu.be/2Zqlb00ttCU?si=8tUOSxm9-Mx7V9De' },
    { id: 165, title: 'Agomoni Aalo', artist: 'Jayati Chakraborty', duration: '5:40', cover: '/agomoni-aalo-cover.jpg', src: '/songs/agomoni-aalo.mp3', youtubeId: 'https://youtu.be/bvij2HdGgv4?si=yMUKncM4zAA4DBuG' },
    { id: 166, title: 'Bajlo Tomar Aalor Benu', artist: 'Supriti Ghosh', duration: '3:40', cover: '/bajlo-tomar-aalor-benu-supriti-cover.jpg', src: '/songs/bajlo-tomar-aalor-benu-supriti.mp3', youtubeId: 'https://youtu.be/mnKcHhCOyT8?si=koCe3kqi0ZMZOyQb' },
    { id: 167, title: 'Bajlo tomar alor benu', artist: 'Sriparna Das', duration: '4:51', cover: '/bajlo-tomar-alor-benu-sriparna-cover.jpg', src: '/songs/bajlo-tomar-alor-benu-sriparna.mp3', youtubeId: 'https://youtu.be/yrly1QZ5R6w?si=qnQTSPvPhrYC9LbT' },
    { id: 168, title: 'Durge Durge Durgatinashini', artist: 'Debolinaa Nandy', duration: '3:49', cover: '/durge-durge-durgatinashini-debolinaa-cover.jpg', src: '/songs/durge-durge-durgatinashini-debolinaa.mp3', youtubeId: 'https://youtu.be/3M6dJZV_MEo?si=HLxPik4lHSqZOGnd' },
    { id: 169, title: 'Durge Durge Durgatinashini', artist: 'Asha Bhosle, Swapan C', duration: '5:08', cover: '/durge-durge-durgatinashini-asha-cover.jpg', src: '/songs/durge-durge-durgatinashini-asha.mp3', youtubeId: 'https://youtu.be/45O8KBhSZ0I?si=pW3IyV12wcba43sy' },
    { id: 170, title: 'Mahishasura Mardini Stotram', artist: 'Upali Chattopadhyay', duration: '16:37', cover: '/mahishasura-mardini-stotram-cover.jpg', src: '/songs/mahishasura-mardini-stotram.mp3', youtubeId: 'https://youtu.be/BUgauY0Xtt8?si=3hrWh3XsMXv4bDFv' },
    { id: 171, title: 'Ya Chandi', artist: 'Chorus', duration: '1:57', cover: '/ya-chandi-cover.jpg', src: '/songs/ya-chandi.mp3', youtubeId: 'https://youtu.be/8FytVk54-dw?si=HMnMsSLwQC7V7FfP' },
    { id: 172, title: 'Kalo Jole Kuchla Tole', artist: 'Iman Chakraborty', duration: '4:15', cover: '/kalo-jole-kuchla-tole-cover.jpg', src: '/songs/kalo-jole-kuchla-tole.mp3', youtubeId: 'https://youtu.be/YXG0AW4eidI?si=uJb8lchIlrjtehEx' },
    { id: 173, title: 'Jago Tumi Jago', artist: 'Trissha Chatterjee', duration: '2:28', cover: '/jago-tumi-jago-cover.jpg', src: '/songs/jago-tumi-jago.mp3', youtubeId: 'https://youtu.be/N3P2XkZFmPc?si=5CbevFDmKZeuKcQE' },
    { id: 174, title: 'Raai Jago Go', artist: 'Pousali Banerjee', duration: '6:00', cover: '/raai-jago-go-cover.jpg', src: '/songs/raai-jago-go.mp3', youtubeId: 'https://youtu.be/y-exkDdFJYk?si=bEtKLW5GUqz9iw5q' },
    { id: 175, title: 'Barondala Saaja', artist: 'Madhuraa Bhattacharya', duration: '4:09', cover: '/barondala-saaja-cover.jpg', src: '/songs/barondala-saaja.mp3', youtubeId: 'https://youtu.be/gxSW8E3b3Kg?si=AAqwAS8NQ-DAjhKX' },
    { id: 176, title: 'Ogo Amar Agamani Alo', artist: 'Sipra Bose', duration: '3:41', cover: '/ogo-amar-agamani-alo-cover.jpg', src: '/songs/ogo-amar-agamani-alo.mp3', youtubeId: 'https://youtu.be/2RZZzJdzGPM?si=t3Wq3z8QOI6kKfOz' },
    { id: 177, title: 'Phagun Haoyay Haoyay', artist: 'Jayati Chakraborty', duration: '2:41', cover: '/phagun-haoyay-haoyay-cover.jpg', src: '/songs/phagun-haoyay-haoyay.mp3', youtubeId: 'https://youtu.be/DlKr06Mi0Pk?si=aPAZFBEA59Jpg1Qv' },
    { id: 178, title: 'Saajan Rock the Dotara', artist: 'Timir Biswas Studio', duration: '4:27', cover: '/saajan-rock-the-dotara-cover.jpg', src: '/songs/saajan-rock-the-dotara.mp3', youtubeId: 'https://youtu.be/707QgEnx8Hs?si=lOU1QPj5UCgNLRw-' },
    { id: 179, title: 'Agomonir Gaan', artist: 'Anupam Roy', duration: '6:03', cover: '/agomonir-gaan-cover.jpg', src: '/songs/agomonir-gaan.mp3', youtubeId: 'https://youtu.be/MsqpjM09MrY?si=ZsGj30yF06Bi4AJR' },
    { id: 180, title: 'ওগো আমার আগমনী আলো', artist: 'Samadrita Ghosh', duration: '5:00', cover: '/ogo-amar-agamani-alo-samadrita-cover.jpg', src: '/songs/ogo-amar-agamani-alo-samadrita.mp3', youtubeId: 'https://youtu.be/OlSD9_7P__4?si=pC4W9mrM_H3rFk5a' },
    { id: 181, title: 'Laage Ura Dhura', artist: 'Toofan', duration: '2:45', cover: '/laage-ura-dhura-cover.jpg', src: '/songs/laage-ura-dhura.mp3', youtubeId: 'https://youtu.be/f53nqIBzii8?si=CVLQsayX0-ZlL59F' },
    { id: 182, title: 'Esho Hey', artist: 'Ek Je Chilo Raja', duration: '5:53', cover: '/esho-hey-cover.jpg', src: '/songs/esho-hey.mp3', youtubeId: 'https://youtu.be/AFOg5wPxduc?si=6O0eb-IZtpLNg6Kc' },
    { id: 183, title: 'Apur Paayer Chhaap', artist: 'Arijit Singh', duration: '4:06', cover: '/apur-paayer-chhaap-cover.jpg', src: '/songs/apur-paayer-chhaap.mp3', youtubeId: 'https://youtu.be/aQtdko6JgoU?si=yp0gE_360OvhePaJ' },
    { id: 184, title: 'Doob De Re Mon', artist: 'Nirmalya Roy', duration: '2:15', cover: '/doob-de-re-mon-cover.jpg', src: '/songs/doob-de-re-mon.mp3', youtubeId: 'https://youtu.be/4nC72K3Eihc?si=dbZTXhIFNWvAHc8T' },
    { id: 185, title: 'Gouri Elo', artist: 'Aritra Dasgupta', duration: '5:34', cover: '/gouri-elo-aritra-dasgupta-cover.jpg', src: '/songs/gouri-elo-aritra-dasgupta.mp3', youtubeId: 'https://youtu.be/Q2_0ed23IwU?si=vSfh9EKUowHjBpGO' },
    { id: 186, title: 'Pujar Gaan', artist: 'Hooligaanism', duration: '6:43', cover: '/pujar-gaan-cover.jpg', src: '/songs/pujar-gaan.mp3', youtubeId: 'https://youtu.be/cYt_pENoKvA?si=Fwv-Lh3RK7I_CdOp' },
    { id: 187, title: 'Asatoma Sadgamaya', artist: 'Arijit Singh', duration: '2:56', cover: '/asatoma-sadgamaya-cover.jpg', src: '/songs/asatoma-sadgamaya.mp3', youtubeId: 'https://youtu.be/rS9IrdIbW2c?si=RGHWVw6E0H0HUKK5' },
    { id: 188, title: 'Dakatiya Banshi', artist: 'Bohurupi', duration: '4:03', cover: '/dakatiya-banshi-cover.jpg', src: '/songs/dakatiya-banshi.mp3', youtubeId: 'https://youtu.be/wF9oo8dJ5t4?si=Ks6dB2_cpzcBi4ea' },
    { id: 189, title: 'Police Chorer Preme Poreche', artist: 'Challenge 2', duration: '4:07', cover: '/police-chorer-preme-poreche-cover.jpg', src: '/songs/police-chorer-preme-poreche.mp3', youtubeId: 'https://youtu.be/sUADP6LbcAA?si=bWWL1Gxr7mV8ee8n' },
    { id: 190, title: 'O Lolona', artist: 'পারবো না আমি ছাড়তে তোকে', duration: '4:01', cover: '/o-lolona-parbona-cover.jpg', src: '/songs/o-lolona-parbona.mp3', youtubeId: 'https://youtu.be/ykILxJW-Jsw?si=3TJq_QQURdR-FTFA' },
    { id: 191, title: 'Lady Killer Romeo', artist: 'Romeo', duration: '3:58', cover: '/lady-killer-romeo-cover.jpg', src: '/songs/lady-killer-romeo.mp3', youtubeId: 'https://youtu.be/K3xfnBCDBtA?si=mB4a1K66BAP5s49k' },
    { id: 192, title: 'Le Paglu Dance', artist: 'Bolo Na Tumi Amar', duration: '3:39', cover: '/le-paglu-dance-cover.jpg', src: '/songs/le-paglu-dance.mp3', youtubeId: 'https://youtu.be/Se6HAC3bonE?si=q-lzUvuOc2MR9hsw' },
    { id: 193, title: 'Dushtu Kokil', artist: 'Toofan', duration: '3:39', cover: '/dushtu-kokil-cover.jpg', src: '/songs/dushtu-kokil.mp3', youtubeId: 'https://youtu.be/5zU1qNYR2cw?si=qIgTe4HPIegMryFf' },
    { id: 194, title: 'Tatka Priya Marie', artist: 'Bachchan', duration: '3:35', cover: '/tatka-priya-marie-cover.jpg', src: '/songs/tatka-priya-marie.mp3', youtubeId: 'https://youtu.be/gfksC4UUig0?si=cS4b1zaLq-b-B7I1' },
    { id: 195, title: 'Mala Re', artist: 'Romeo', duration: '4:38', cover: '/mala-re-cover.jpg', src: '/songs/mala-re.mp3', youtubeId: 'https://youtu.be/fDCTCydDvMw?si=PpQooY8FmiGhCJkM' },
    { id: 196, title: 'Bujhina Toh Tai', artist: 'Nusraat Faria', duration: '3:20', cover: '/bujhina-toh-tai-cover.jpg', src: '/songs/bujhina-toh-tai.mp3', youtubeId: 'https://youtu.be/DoKbuK_llzI?si=z2G--4QMVA55k_Mw' },
    { id: 197, title: 'BACHCHAN', artist: 'Benny Dayal', duration: '2:29', cover: '/bachchan-title-song-cover.jpg', src: '/songs/bachchan-title-song.mp3', youtubeId: 'https://youtu.be/X7Krr2qHZBc?si=aMlZLLb9y_vSJpeZ' },
    { id: 198, title: 'MICHRIR DANA', artist: 'BIBAHO OBHIJAN', duration: '3:30', cover: '/michrir-dana-cover.jpg', src: '/songs/michrir-dana.mp3', youtubeId: 'https://youtu.be/fW-otyuQoV8?si=a6vWsAmI8zW8EO-9' },
    { id: 199, title: 'Koka Kola', artist: 'Samidh', duration: '5:14', cover: '/koka-kola-cover.jpg', src: '/songs/koka-kola.mp3', youtubeId: 'https://youtu.be/8TLO00wqQgk?si=CGkePCIjlX99_ach' },
    { id: 200, title: 'Desi Chhori', artist: 'Yoddha', duration: '4:01', cover: '/desi-chhori-cover.jpg', src: '/songs/desi-chhori.mp3', youtubeId: 'https://youtu.be/fqMNUP0x6Uk?si=znLobql0OD8id6aZ' },
    { id: 201, title: 'Party Shoes', artist: 'Bindaas', duration: '3:55', cover: '/party-shoes-cover.jpg', src: '/songs/party-shoes.mp3', youtubeId: 'https://youtu.be/7tvezbukezk?si=fnPp9RjAkotQ055S' },
    { id: 202, title: 'Baundule Ghuri', artist: 'Anupam Roy', duration: '5:43', cover: '/baundule-ghuri-cover.jpg', src: '/songs/baundule-ghuri.mp3', youtubeId: 'https://youtu.be/HB8ZqdR2yTM?si=noEvzV9EGGtGzP1a' },
    { id: 203, title: 'Panga', artist: 'Herogiri', duration: '3:03', cover: '/panga-herogiri-cover.jpg', src: '/songs/panga-herogiri.mp3', youtubeId: 'https://youtu.be/Uj7AfuCe8vU?si=cPyprl8QoxHm4dw_' },
    { id: 204, title: 'Tumi Jantei Paro Naa', artist: 'Mahtim Shakib', duration: '3:59', cover: '/tumi-jantei-paro-naa-cover.jpg', src: '/songs/tumi-jantei-paro-naa.mp3', youtubeId: 'https://youtu.be/1M7xKGCTLd8?si=yUO5R_ADCo8xXGTA' },
    { id: 205, title: 'Takey Olpo Kache Dakchi', artist: 'Mahtim Shakib', duration: '3:18', cover: '/takey-olpo-kachhe-dakchhi-cover.jpg', src: '/songs/takey-olpo-kachhe-dakchhi.mp3', youtubeId: 'https://youtu.be/Nly8TUAGyYI?si=ToYhAlClK2GWizwV' },
    { id: 206, title: 'Kanamachi', artist: 'Katukutu Buro', duration: '2:30', cover: '/kanamachi-katukutu-buro-cover.jpg', src: '/songs/kanamachi-katukutu-buro.mp3', youtubeId: 'https://youtu.be/zAKTQ3GC63g?si=adOsn8ZJcQeY4I3j' },
    { id: 207, title: 'Sohena Jatona X Mc MugzKon Se Para', artist: 'MjProduction', duration: '3:09', cover: '/sohena-jatona-remix-cover.jpg', src: '/songs/sohena-jatona-remix.mp3', youtubeId: 'https://youtu.be/zMGlw7o48j4?si=Jz1hjg76Tf3WNaVz' },
    { id: 208, title: 'Egiye De', artist: 'Shudhu Tomari Jonyo', duration: '4:13', cover: '/egiye-de-cover.jpg', src: '/songs/egiye-de.mp3', youtubeId: 'https://youtu.be/lgvtusNiHQo?si=roK3sutSEe5ut_Gu' },
    { id: 209, title: 'Shudhu Tomari Jonyo Theme', artist: 'Shudhu Tomari Jonyo', duration: '3:17', cover: '/shudhu-tomari-jonyo-theme-cover.jpg', src: '/songs/shudhu-tomari-jonyo-theme.mp3', youtubeId: 'https://youtu.be/_DKjY1eTFws?si=LV3B2WnEa_Ty53Ga' },
    { id: 210, title: 'Ure Geche', artist: 'পারব না আমি ছাড়তে তোকে', duration: '4:26', cover: '/ure-geche-cover.jpg', src: '/songs/ure-geche.mp3', youtubeId: 'https://youtu.be/G8DalXW6KUk?si=RaNwunEkh4U6BInn' },
    { id: 211, title: 'Amake Nao', artist: 'Srikanto', duration: '2:58', cover: '/amake-nao-cover.jpg', src: '/songs/amake-nao.mp3', youtubeId: 'https://youtu.be/iT4Lo-xkWao?si=aqzV8W2jj4t8rrhe' },
    { id: 212, title: 'Pheshey Jaai', artist: 'Toofan', duration: '4:10', cover: '/pheshey-jaai-cover.jpg', src: '/songs/pheshey-jaai.mp3', youtubeId: 'https://youtu.be/Cr63LJY3jsY?si=tNBiASIILcQ7ZT5-' },
    { id: 213, title: 'Maje Majhe', artist: 'Love Express', duration: '4:46', cover: '/maje-majhe-cover.jpg', src: '/songs/maje-majhe.mp3', youtubeId: 'https://youtu.be/7GjFV21Ps5U?si=rWl2DKl_vDx8hwY4' },
    { id: 214, title: 'Tumi Aashe Paashe', artist: 'Parbona Ami Charte Toke', duration: '4:38', cover: '/tumi-aashe-paashe-cover.jpg', src: '/songs/tumi-aashe-paashe.mp3', youtubeId: 'https://youtu.be/bnFiJ_e_dEg?si=N4VnvkEaSMGQnjJ5' },
    { id: 215, title: 'Sundori Kamala', artist: 'Bachchan', duration: '4:07', cover: '/sundori-kamala-cover.jpg', src: '/songs/sundori-kamala.mp3', youtubeId: 'https://youtu.be/xu0e02wkKv8?si=2oAhkWIRMeD13rWZ' },
    { id: 216, title: 'Latai', artist: 'Bachchan', duration: '2:23', cover: '/latai-cover.jpg', src: '/songs/latai.mp3', youtubeId: 'https://youtu.be/cabCddE_dLI?si=PesEfd3ApbwnEIKo' },
    { id: 217, title: 'Bachchan Mashup', artist: 'Bachchan', duration: '3:22', cover: '/bachchan-mashup-cover.jpg', src: '/songs/bachchan-mashup.mp3', youtubeId: 'https://youtu.be/fWSF7hyvOu4?si=FVn-d9ORJ6621VDO' },
    { id: 218, title: 'Sajani', artist: 'Dilkhush', duration: '3:27', cover: '/sajani-cover.jpg', src: '/songs/sajani.mp3', youtubeId: 'https://youtu.be/GuA_q56Lqx0?si=FO3BvK6mes-IDspo' },
    { id: 219, title: 'Aashona', artist: 'Borbaad', duration: '3:55', cover: '/aashona-cover.jpg', src: '/songs/aashona.mp3', youtubeId: 'https://youtu.be/Tt-mCnzPK-o?si=KEO1_IyQBqZW0XFZ' },
    { id: 220, title: 'Elo Re Dugga Elo Re', artist: 'Raj Barman', duration: '4:02', cover: '/elo-re-dugga-elo-re-cover.jpg', src: '/songs/elo-re-dugga-elo-re.mp3', youtubeId: 'https://youtu.be/ut_94nmPOHg?si=koPFLm1QdnWb6lqU' },
    { id: 221, title: 'Era Sukher Laagi', artist: 'Chokher Bali', duration: '2:44', cover: '/era-sukher-laagi-cover.jpg', src: '/songs/era-sukher-laagi.mp3', youtubeId: 'https://youtu.be/KGjpdIsaogY?si=QtBCnldZ4drdIOvU' },
    { id: 222, title: 'Eksho Vrindavan', artist: 'Haripada Bandwala', duration: '3:52', cover: '/eksho-vrindavan-cover.jpg', src: '/songs/eksho-vrindavan.mp3', youtubeId: 'https://youtu.be/kmaRdH-BbHA?si=KTtz1yy8T5jCSS_e' },
    { id: 223, title: 'Prem E Pagol', artist: 'Haripada Bandwala', duration: '3:47', cover: '/prem-e-pagol-cover.jpg', src: '/songs/prem-e-pagol.mp3', youtubeId: 'https://youtu.be/_AnMcavA-AU?si=ZbQ0dERus1sa963n' },
    { id: 224, title: 'Bojhabo Ki Kore', artist: 'Haripada Bandwala', duration: '4:11', cover: '/bojhabo-ki-kore-cover.jpg', src: '/songs/bojhabo-ki-kore.mp3', youtubeId: 'https://youtu.be/CP2AYEqoaZo?si=rQwJgpv2JK-LxBDC' },
    { id: 225, title: 'Tumi Emni Emni Esho', artist: 'Durgo Rawhoshyo', duration: '3:34', cover: '/tumi-emni-emni-esho-cover.jpg', src: '/songs/tumi-emni-emni-esho.mp3', youtubeId: 'https://youtu.be/NqKfGwkTlKA?si=a1fplSoM4MN1DU3z' },
    { id: 226, title: 'Esho Hey Prano Sokha', artist: 'Charitraheen 2', duration: '5:13', cover: '/esho-hey-prano-sokha-cover.jpg', src: '/songs/esho-hey-prano-sokha.mp3', youtubeId: 'https://youtu.be/Cc9dOvOy3aU?si=KuRsIbkjx7f42Ng9' },
    { id: 227, title: 'Hey Shokha', artist: 'Somlata Acharyya Chowdhury', duration: '4:23', cover: '/hey-shokha-cover.jpg', src: '/songs/hey-shokha.mp3', youtubeId: 'https://youtu.be/aqWcgm8ZDPc?si=ahmE7O03H9JmC0SA' },
    { id: 228, title: 'Shaajo Shaajao', artist: 'Ballabhpurer Roopkotha', duration: '4:12', cover: '/shaajo-shaajao-cover.jpg', src: '/songs/shaajo-shaajao.mp3', youtubeId: 'https://youtu.be/WqQHmPceqv8?si=0NtqZEvEYA3dhJ2p' },
    { id: 229, title: 'Notun Premer Gaan', artist: 'Ballabhpurer Roopkotha', duration: '3:57', cover: '/notun-premer-gaan-cover.jpg', src: '/songs/notun-premer-gaan.mp3', youtubeId: 'https://youtu.be/ivHOBNOBUDU?si=x1VxIQZRZkzIDgIi' },
    { id: 230, title: 'Raat Pohale', artist: 'Dracula Sir', duration: '4:04', cover: '/raat-pohale-cover.jpg', src: '/songs/raat-pohale.mp3', youtubeId: 'https://youtu.be/7hE8a1RkptQ?si=e14-NNSPtG1GRoA9' },
    { id: 231, title: 'Abar Jonmo Nebo', artist: 'Dracula Sir', duration: '5:25', cover: '/abar-jonmo-nebo-cover.jpg', src: '/songs/abar-jonmo-nebo.mp3', youtubeId: 'https://youtu.be/d80R6HPWdY4?si=3uYrGYtUS3auItSr' },
    { id: 232, title: 'Khoka Chalu Cheez', artist: 'Khokababu', duration: '3:17', cover: '/khoka-chalu-cheez-cover.jpg', src: '/songs/khoka-chalu-cheez.mp3', youtubeId: 'https://youtu.be/SWdY2Pt8kn0?si=1jqJdqQ5I1-27fhR' },
    { id: 233, title: 'Pyaar Ka Bukhar', artist: 'Challenge 2', duration: '3:32', cover: '/pyaar-ka-bukhar-cover.jpg', src: '/songs/pyaar-ka-bukhar.mp3', youtubeId: 'https://youtu.be/rVZezQEAivU?si=pvmUUm1BuPDaIpcM' },
    { id: 234, title: 'Pakka Ghughu Maal', artist: 'Aami Sudhu Cheyechi Tomay', duration: '4:15', cover: '/pakka-ghughu-maal-cover.jpg', src: '/songs/pakka-ghughu-maal.mp3', youtubeId: 'https://youtu.be/bNSlgCQpqks?si=VXleuREJueSM_8lP' },
    { id: 235, title: 'Dhichkiyaon', artist: 'Jamai 420', duration: '3:46', cover: '/dhichkiyaon-cover.jpg', src: '/songs/dhichkiyaon.mp3', youtubeId: 'https://youtu.be/RK-DxoVGtL0?si=G1gt6k3VFt51vQzF' },
    { id: 236, title: 'Jamai 420', artist: 'Jamai 420', duration: '3:43', cover: '/jamai-420-cover.jpg', src: '/songs/jamai-420.mp3', youtubeId: 'https://youtu.be/D2XymZmjaus?si=jEVTkRjLFE03w0PF' },
    { id: 237, title: '3G', artist: 'Hero 420', duration: '3:36', cover: '/3g-cover.jpg', src: '/songs/3g.mp3', youtubeId: 'https://youtu.be/cHQ73ylapIY?si=7V8OfU-j3NJu6Fc9' },
    { id: 238, title: 'Aami Raaji', artist: 'Katmundu', duration: '4:02', cover: '/aami-raaji-cover.png', src: '/songs/aami-raaji.mp3', youtubeId: 'https://youtu.be/-uEkVZQMQkE?si=glH2UEWh2dMfcE62' },
    { id: 239, title: 'Eto Alo', artist: 'Katmundu', duration: '3:34', cover: '/eto-alo-cover.png', src: '/songs/eto-alo.mp3', youtubeId: 'https://youtu.be/iIeV4Bx-bFA?si=B-MCGRgzJBzrIHH2' },
  ];

export const mahalayaSongs = [
    { id: 10, title: 'Mahalaya', artist: 'Birendra Krishna Bhadra', duration: '89:13', cover: '/mahalaya-cover.jpg', src: '/songs/mahalaya.mp3', youtubeId: 'https://youtu.be/YQyo8QeoYhc?si=mW6kmE5iR4KgkCXb' },
    { id: 11, title: 'Chandipath', artist: 'Birendra Krishna Bhadra', duration: '12:15', cover: '/mahalaya-cover.jpg', src: '/songs/chandipath.mp3', youtubeId: 'https://youtu.be/S1Y3ohrjrsE?si=05MUFaXHqm2nwIvz' },
    { id: 12, title: 'Ya Chandi', artist: 'Chorus', duration: '1:57', cover: '/mahalaya-cover.jpg', src: '/songs/ya-chandi.mp3', youtubeId: 'https://youtu.be/8FytVk54-dw?si=HMnMsSLwQC7V7FfP' },
    { id: 999, title: 'Simhasta Sashishekhara', artist: 'Birendra Krishna Bhadra', duration: '0:57', cover: '/mahalaya-cover.jpg', src: '/songs/simhasta.mp3', youtubeId: 'https://youtu.be/UQHikCYHrx0?si=WWnpGBhwCN_stlJ-' },
    { id: 14, title: 'Bajlo Tomar Aalor Benu', artist: 'Supriti Ghosh', duration: '3:40', cover: '/mahalaya-cover.jpg', src: '/songs/bajlo-tomar-aalor-benu-supriti.mp3', youtubeId: 'https://youtu.be/mnKcHhCOyT8?si=koCe3kqi0ZMZOyQb' },
    { id: 15, title: 'Ogo Amar Agamani', artist: 'Sipra Bose', duration: '3:41', cover: '/mahalaya-cover.jpg', src: '/songs/ogo-amar-agamani-alo.mp3', youtubeId: 'https://youtu.be/2RZZzJdzGPM?si=t3Wq3z8QOI6kKfOz' },
    { id: 16, title: 'Tabo Achinta Rupa', artist: 'Manabendra Mukherjee', duration: '4:25', cover: '/mahalaya-cover.jpg', src: '/songs/tabo-achinta-rupa.mp3', youtubeId: 'https://youtu.be/6rwF1iQPVzc?si=Yr2r5ILadF11986-' },
    { id: 17, title: 'Jago Durga Dashapraharanadharinee', artist: 'Dwijen Mukherjee', duration: '1:45', cover: '/mahalaya-cover.jpg', src: '/songs/jago-durga.mp3', youtubeId: 'https://youtu.be/IfSJy3_Lkuo?si=VgdsRd6fJR_FQtYU' },
    { id: 18, title: 'Dosh Karo Noy Go Ma', artist: 'Pannalal Bhattacharya', duration: '3:26', cover: '/mahalaya-cover.jpg', src: '/songs/dosh-karo-noy-go-ma.mp3', youtubeId: 'https://youtu.be/UpmsC0FAcf4?si=eKlMbR4el1UktR0g' },
    { id: 19, title: 'Arunkanti Ke Go Jogi', artist: 'Manabendra Mukherjee', duration: '3:00', cover: '/mahalaya-cover.jpg', src: '/songs/arunkanti.mp3', youtubeId: 'https://youtu.be/NOYokPXG2_I?si=0ysGp83MkMwfvoTX' },
    { id: 20, title: 'Jaya Jaya Japya', artist: 'Chorus', duration: '2:32', cover: '/mahalaya-cover.jpg', src: '/songs/jaya-jaya-japya.mp3', youtubeId: 'https://youtu.be/AB4IUcvuEXs?si=Bfx96WVNOuiSXzRX' },
    { id: 1012, title: 'Aham Rudrebhirvasubhischara', artist: 'Mahishasura Mardini', duration: '4:00', cover: '/mahalaya-cover.jpg', src: '/songs/aham-rudrebhirvasubhischara.mp3', youtubeId: 'https://youtu.be/GJccKU4_5wg?si=Aq3-0qiGcPmPCegA' },
    { id: 1013, title: 'Akhila-Bimane Taba Jaya-Gane', artist: 'Krishna Dasgupta', duration: '4:03', cover: '/mahalaya-cover.jpg', src: '/songs/akhila-bimane.mp3', youtubeId: 'https://youtu.be/FrHp3pXxeNU?si=X89Tb2eCO1cgBU1L' },
    { id: 1014, title: 'Jayanti Mangala Kali', artist: 'Birendra Krishna Bhadra', duration: '7:10', cover: '/mahalaya-cover.jpg', src: '/songs/jayanti.mp3', youtubeId: 'https://youtu.be/Uwe7xGARrfA?si=jV5_AbNImcLIMiFY' },
    { id: 1015, title: 'Subhra Sankha', artist: 'Shyamal Mitra', duration: '3:00', cover: '/mahalaya-cover.jpg', src: '/songs/subhra-sankha.mp3', youtubeId: 'https://youtu.be/R4LrXsy3Cgw?si=xnN2Xj7OUfa-u8OV' },
    { id: 1016, title: 'Jatajutasamayuktamardhendukrita-Sekharam', artist: 'Mahishasura Mardini', duration: '4:26', cover: '/mahalaya-cover.jpg', src: '/songs/jatajutasamayuktamardhendukrita-sekharam.mp3', youtubeId: 'https://youtu.be/h5O3igngxCU?si=R2vk8lkkuVF78gED' },
    { id: 1017, title: 'Ya Devi Sarbabhutesu', artist: 'Birendrakrishna Bhadra', duration: '5:12', cover: '/mahalaya-cover.jpg', src: '/songs/ya-devi-sarbabhutesu.mp3', youtubeId: 'https://youtu.be/RuJ_BPKdJpo?si=a6PZz2Z23PcoFX48' },
    { id: 1018, title: 'Namo Chandi, Namo Chandi', artist: 'Bimal Bhushan', duration: '3:23', cover: '/mahalaya-cover.jpg', src: '/songs/namo-chandi.mp3', youtubeId: 'https://youtu.be/IlerrCPk_0Y?si=MMW98puaKpP6rAh-' },
    { id: 1019, title: 'Ma Go Tabu Beene Sangeeta', artist: 'Sumitra Sen', duration: '3:40', cover: '/mahalaya-cover.jpg', src: '/songs/ma-go-tabu-beene.mp3', youtubeId: 'https://youtu.be/qdx842oMwnA?si=lBgHf4UjTIpzgRLp' },
    { id: 1020, title: 'Bimane Bimane', artist: 'Sandhya Mukherjee', duration: '3:00', cover: '/mahalaya-cover.jpg', src: '/songs/bimane-bimane.mp3', youtubeId: 'https://youtu.be/-ZJtci1_Ih0?si=DGsiLbXhQTR-FGib' },
    { id: 1021, title: 'He Chinmoyi', artist: 'Tarun Banerjee', duration: '3:12', cover: '/mahalaya-cover.jpg', src: '/songs/he-chinmoyi.mp3', youtubeId: 'https://youtu.be/zuVw7KFPQnk?si=6Z_bNj8SUGXgIsx6' },
    { id: 1022, title: 'Santi Dile Bhari', artist: 'Utpala Sen', duration: '2:12', cover: '/mahalaya-cover.jpg', src: '/songs/santi-dile-bhari.mp3', youtubeId: 'https://youtu.be/VAV6OQMe-to?si=4vHJiuoqYlyDaeUx' },
    { id: 1023, title: 'Aaha Ki Anando Akashe Batashy', artist: 'Hirak Rajar Deshe', duration: '7:08', cover: '/mahalaya-cover.jpg', src: '/songs/aaha-ki-anando.mp3', youtubeId: 'https://youtu.be/PIw4zEvlA1E?si=Dxe5UvAOBTsve8Qb' },
  ];

const SongListPopup = ({ onClose, onSelectSong, currentSong, pandalList = pandalSongs, mahalayaList = mahalayaSongs, favoriteList = [], isFavoriteMode = false, customTitle, hideTabs = false, initialTab = 'pandal', className = '' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [localIsFavoriteMode, setLocalIsFavoriteMode] = useState(isFavoriteMode);
  const activeSongRef = useRef(null);
  
  const currentSongs = localIsFavoriteMode ? favoriteList : (activeTab === 'pandal' ? pandalList : mahalayaList);

  useEffect(() => {
    if (activeSongRef.current) {
      setTimeout(() => {
        if (!activeSongRef.current) return;
        
        const originalIndex = currentSongs.findIndex(s => s.src === currentSong?.src);
        let shouldScroll = true;
        
        if (activeTab === 'pandal' && originalIndex >= 142) {
          shouldScroll = false;
        } else if (activeTab === 'mahalaya' && originalIndex >= 15) {
          shouldScroll = false;
        }
        
        if (shouldScroll) {
          activeSongRef.current.scrollIntoView({ block: 'nearest' });
        } else {
          activeSongRef.current.scrollIntoView({ block: 'nearest' });
        }
      }, 50);
    }
  }, [activeTab, localIsFavoriteMode]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const handlePopState = (e) => {
      if (e.state?.view === 'music-search') {
        setIsSearchOpen(true);
      } else {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    if (window.history.state?.view === 'music-search') {
      setIsSearchOpen(true);
    }
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const openSearch = () => {
    window.history.pushState({ view: 'music-search' }, '');
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    if (window.history.state?.view === 'music-search') {
      window.history.back();
    } else {
      setIsSearchOpen(false);
    }
  };

  const filteredSongs = currentSongs.filter((song, index) => {
    const serialNumber = (index + 1).toString();
    const query = searchQuery.toLowerCase();
    return (
      serialNumber === query ||
      song.title.toLowerCase().includes(query) || 
      song.artist.toLowerCase().includes(query)
    );
  });

  return (
    <div className={`song-list-overlay ${className}`} onClick={onClose}>
      <div className="song-list-popup glass-panel" onClick={e => e.stopPropagation()}>
        
        {/* Header Section */}
        <div className="song-list-header">
          <div className="song-list-header-top">
            <div className="song-list-title-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.6)', padding: '0 24px 6px 24px' }}>
              <h2 className="song-list-title-text bengali-text" style={{ borderBottom: 'none', padding: 0 }}>
                {localIsFavoriteMode ? 'প্রিয় গান' : (customTitle || 'পুজো স্পেশাল')}
              </h2>
              <button 
                onClick={() => setLocalIsFavoriteMode(!localIsFavoriteMode)}
                style={{ background: 'transparent', border: 'none', color: localIsFavoriteMode ? '#ff4757' : 'rgba(255, 255, 255, 0.7)', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', transition: 'all 0.2s ease', transform: 'translateY(-1px)' }}
                title="Toggle Favorite Playlist"
              >
                <Heart size={18} fill={localIsFavoriteMode ? '#ff4757' : 'none'} />
              </button>
            </div>
            <button className="close-btn" onClick={onClose}>
              <X size={24} />
            </button>
          </div>
          <div className="song-list-tabs-container">
            {!isSearchOpen ? (
              (!localIsFavoriteMode && !hideTabs) && (
                <div className="song-list-tabs bengali-text animation-pop-in">
                  <button 
                    className={`tab-btn-modern ${activeTab === 'pandal' ? 'active' : ''}`}
                    onClick={() => setActiveTab('pandal')}
                  >
                    প্যান্ডেল কালেকশন
                  </button>
                  <button 
                    className={`tab-btn-modern ${activeTab === 'mahalaya' ? 'active' : ''}`}
                    onClick={() => setActiveTab('mahalaya')}
                  >
                    মহালয়া ও গান
                  </button>
                </div>
              )
            ) : (
              <div className="search-input-container animation-pop-in">
                <input
                  type="text"
                  className="search-input"
                  placeholder="গান খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button className="search-close-btn" onClick={() => { closeSearch(); setSearchQuery(''); }}>
                  <X size={16} />
                </button>
              </div>
            )}
            
            {!isSearchOpen && (
              <button className="search-icon-btn animation-pop-in" onClick={openSearch}>
                <Search size={18} />
              </button>
            )}
          </div>

        </div>

        {/* Scrollable Song Stack */}
        <div className="song-stack">
          {filteredSongs.length > 0 ? (
            filteredSongs.map((song) => {
              const isActive = song.src === currentSong?.src;
              const originalIndex = currentSongs.indexOf(song);
              return (
                <div key={song.id} ref={isActive ? activeSongRef : null} className={`song-card-modern ${isActive ? 'active' : ''}`} onClick={() => onSelectSong(song)}>
                  <div className="song-card-left-modern">
                    <div className="song-index" style={{ color: isActive ? '#daa520' : 'rgba(255,255,255,0.5)' }}>
                      {isActive ? <Music size={14} /> : (originalIndex + 1).toString().padStart(2, '0')}
                    </div>
                    <img src={song.cover} alt={song.title} className="song-card-cover-modern" />
                    <div className="song-card-info-modern">
                      <div className="song-card-title-modern" style={{ color: isActive ? '#daa520' : '#fff' }}>{song.title}</div>
                      <div className="song-card-artist-modern">{song.artist}</div>
                    </div>
                  </div>
                  <div className="song-card-duration-modern">
                    {song.duration}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="no-songs-found bengali-text animation-pop-in">
              {isFavoriteMode && favoriteList.length === 0 ? 'গান যোগ করুন' : 'গানটি উপলব্ধ নয়'}
            </div>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default SongListPopup;

