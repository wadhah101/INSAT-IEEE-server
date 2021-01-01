--
-- PostgreSQL database dump
--

-- Dumped from database version 12.5
-- Dumped by pg_dump version 13.1

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE ONLY public."MemberBadge" DROP CONSTRAINT "MemberBadge_memberId_fkey";
DROP INDEX public."MemberBadge_memberId_unique";
DROP INDEX public."MemberBadge.imageDriveId_unique";
DROP INDEX public."Member.phone_unique";
DROP INDEX public."Member.email_unique";
ALTER TABLE ONLY public."Member" DROP CONSTRAINT "Member_pkey";
ALTER TABLE ONLY public."MemberBadge" DROP CONSTRAINT "MemberBadge_pkey";
ALTER TABLE public."MemberBadge" ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE public."MemberBadge_id_seq";
DROP TABLE public."MemberBadge";
DROP TABLE public."Member";
SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Member; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."Member" (
    id text NOT NULL,
    "fbLink" text,
    phone integer,
    email text,
    gender public."Gender",
    "fullName" text NOT NULL,
    "studyField" text,
    "studyLevel" integer
);


--
-- Name: MemberBadge; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."MemberBadge" (
    "imageDriveId" text,
    "memberId" text NOT NULL,
    id integer NOT NULL,
    wave integer NOT NULL
);


--
-- Name: MemberBadge_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."MemberBadge_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: MemberBadge_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."MemberBadge_id_seq" OWNED BY public."MemberBadge".id;


--
-- Name: MemberBadge id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MemberBadge" ALTER COLUMN id SET DEFAULT nextval('public."MemberBadge_id_seq"'::regclass);


--
-- Data for Name: Member; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."Member" (id, "fbLink", phone, email, gender, "fullName", "studyField", "studyLevel") FROM stdin;
cki7mhe2l0000qf6xggjc9v5h	https://www.facebook.com/profile.php?id=100009615242026	52370966	bahriwala@gmail.com	male	Wala Bahri	GL	3
cki7mhe2l0001qf6x781gpge8	https://www.facebook.com/yosra.dridi.372/	58824727	yosra.dridi@insat.u-carthage.tn	female	Yosra Dridi	GL	3
cki7mhe2m0002qf6x70ebdenb	Asma sessi	53325334	bessassiasma@gmail.com	female	Asma Bessassi	CH	2
cki7mhe2m0003qf6xwzzr7q6x	https://www.facebook.com/siwar.chammakhi.79	54061670	siwarchammakhiwara@gmail.com	female	Chammakhi Siwar	CBA	1
cki7mhe2m0004qf6xae8z8r79	https://www.facebook.com/safa.ayed.77	21462286	ayed.safa12@gmail.com	female	Safa Ayed	IIA	2
cki7mhe2m0005qf6x02tdsi3q	\N	50721469	manaimaryem7@gmail.com	female	Manai Maryem	IMI	2
cki7mhe2m0006qf6xomg5kixi	https://www.facebook.com/aymen.rf	24194578	aymen.aymen1903@gmail.com	male	Aymen Boujmil	GL	3
cki7mhe2m0007qf6x5244xci7	https://www.facebook.com/nour.kalai	52950384	kalaiinour@yahoo.com	female	Nour Kalai	IIA	2
cki7mhe2m0008qf6xdaut5soc	https://www.facebook.com/vousmevoyez.youseeme	55314823	dhaoui.fatmaa@gmail.com	female	Fatma Dhaoui	IIA	3
cki7mhe2m0009qf6xvggh1s9n	https://www.facebook.com/HardcoreGamer14/	97652919	maarefomar@icloud.com	male	Omar Maaref	GL	2
cki7mhe2m0010qf6xuoelvfue	https://www.facebook.com/nora.tagorti	28036208	noratagourti29@gmail.com	female	Nora Tagourti	BIO	2
cki7mhe2m0011qf6xji1d9qn1	https://www.facebook.com/profile.php?id=100011205372608	27621067	emnag1234@gmail.com	female	Gharbi Emna	Essai	1
cki7mhe2m0012qf6xhol869fv	https://www.facebook.com/salma.chebbi.756/	22215	salmachebbi2000@yahoo.com	female	Salma Chebbi	IMI	2
cki7mhe2m0013qf6x4rewxosv	https://www.facebook.com/anaghim.kortas.5	92210397	anaghimkortas1000@gmail.com	female	Anaghim Kortas	CH	2
cki7mhe2n0014qf6xlkc7m3sf	https://www.facebook.com/Nader.Ouerdiane/	24702870	nader_ouerdiane@hotmail.com	male	Nader Ouerdiane	GL	2
cki7mhe2n0015qf6xhayko25k	https://www.facebook.com/mlle.Mourali	26663778	mouralisandra17@gmail.com	female	Sandra Mourali	MPI	1
cki7mhe2n0016qf6xaaalw13g	https://www.facebook.com/helmi.balhoudi	28702361	balhoudihelmi@gmail.com	male	Balhoudi Helmi	IIA	2
cki7mhe2n0017qf6xqs2qanqy	https://docs.google.com/forms/d/e/1FAIpQLSdE9fJBH8wVSMqeTEB92i7yjrOy7yUdESH-WU00cxvOZOpl7A/viewform	97334300	ilef_rjiba@yahoo.fr	female	Ilef Rjiba	MPI	1
cki7mhe2n0018qf6xa0hvkt51	\N	25144428	tasnime.farhat98@gmail.com	female	Farhat Tesnim	CBA	1
cki7mhe2n0019qf6x3tujxjkk	https://www.facebook.com/sirine.mzoughi.75	21546534	sirine.mzoughi199@gmail.com	female	Sirine Mzoughi	MPI	1
cki7mhe2n0020qf6xhiyi8v0v	https://www.facebook.com/profile.php?id=100005969237813	92668869	lyeschamekh@gmail.com	male	Elyes Chamekh	IIA	2
cki7mhe2n0021qf6xwe9swm89	https://www.facebook.com/profile.php?id=100009725238268	58927870	edrisshk@gmail.com	male	Hadj Khelil Edriss	IIA	2
cki7mhe2n0022qf6xgik0za27	https://www.facebook.com/Aymenben.mariem	58028642	benmariema@gmail.com	male	Aymen Ben Mariem	MPI	1
cki7mhe2n0023qf6xrdx5no2k	https://www.facebook.com/emna.cheniour.23/	94364850	emnacheniour2000@gmail.com	female	Emna Cheniour	GL	2
cki7mhe2o0025qf6x1obmnkfz	https://www.facebook.com/yosr.laatar.1	22262196	yosr.laatar@yahoo.com	female	Yosr Laatar	IMI	2
cki7mhe2o0026qf6xbgryfs3c	https://www.facebook.com/profile.php?id=100010995991832	56062502	bchiramani00@gmail.com	female	Amani Bchir	GL	2
cki7mhe2o0027qf6xr8f757k0	https://m.facebook.com/meryem.soltani.3?ref=bookmarks	22348403	meryem.soltani16@outlook.com	female	Meryem Soltani	IMI	2
cki7mhe2o0028qf6x8wfl8q82	https://www.facebook.com/khalil.bensalah	55129101	khalilbsalah2002@gmail.com	male	Khalil Ben Salah	CBA	1
cki7mhe2o0029qf6x63djjygs	https://m.facebook.com/ameni.feteh.334	95799528	amanyfetah@gmail.com	female	Amany Fetah	RT	2
cki7mhe2o0030qf6xq77rlhlx	https://www.facebook.com/aziz.elouaer/	50151434	medazizelouaer@gmail.com	male	Mohamed Aziz Elouaer	MPI	1
cki7mhe2o0031qf6x9pye4bmy	https://www.facebook.com/souha.mseibi.3/	58034662	souhamseibi2@gmail.com	female	Souha Mseibi	IIA	3
cki7mhe2o0032qf6xi8yyuuxh	\N	95087282	ineskhelifi042@gmail.com	female	Ines Khlifi	CBA	1
cki7mhe2o0033qf6xku6545i1	https://m.facebook.com/sarra.benhalima.5?tsid=0.644173826960696&source=result	28530160	grellb.h@gmail.com	female	Sarra Ben Halima	MPI	1
cki7mhe2o0034qf6xs095umgs	https://www.facebook.com/cyrine.jerbi.5201	27405280	syrine189@gmail.com	female	Syrine Jerbi	CBA	1
cki7mhe2o0035qf6x3neo2z3u	https://www.facebook.com/profile.php?id=100054308867311	94690078	rahmakoualdia126@gmail.com	female	Rahma Khoualdia	CBA	1
cki7mhe2p0036qf6xq36m151c	https://www.facebook.com/chayma.ma.925	27816238	shaymahajjem44@gmail.com	female	Shayma Hajjem	CBA	1
cki7mhe2p0037qf6xbb1kba0l	https://l.facebook.com/l.php?u=https%3A%2F%2Fdocs.google.com%2Fforms%2Fd%2Fe%2F1FAIpQLSdE9fJBH8wVSMqeTEB92i7yjrOy7yUdESH-WU00cxvOZOpl7A%2Fviewform&h=AT3pk9P5e5lW1TQrbZ2GSnBSUG6I9cwN6u0g7mZkfzbXEGlgtbniZ7Q0SwBpOPoqI7Nqpqkhw_3cSUZpoXvsh2FRTAr5mZdg6npykXDC51WSFty6aGQ4evkbO4YsX4wly4XLT8Phaw	51815170	ayamejri201@gmail.com	female	Aya Mejri	MPI	1
cki7mhe2p0038qf6x713g9dnt	https://www.facebook.com/hind.afli	99012300	aflihind1@gmail.com	female	Afli Hind	IMI	2
cki7mhe2p0039qf6xuksegr6y	https://m.facebook.com/amira.becheikh.56?ref=bookmarks	56930775	amirabecheikh12@gmail.com	female	Amira Becheikh	CH	3
cki7mhe2p0040qf6xmhcg2t9o	https://www.facebook.com/Khaldountaktak0/	52514907	khaldoun.taktak@gmail.com	male	Khaldoun Taktak	MPI	1
cki7mhe2p0041qf6xm6m04a0n	https://www.facebook.com/elaa.chaabani	96946108	chaabanielaa@gmail.com	female	Elaa Chaabani	IIA	3
cki7mhe2p0042qf6xeizb96i4	https://m.facebook.com/?_rdr#!/linda.ghazoueni	55120635	lindaghazouani@icloud.com	female	Linda Ghazouani	IMI	3
cki7mhe2p0043qf6xc8u8x6wz	https://www.facebook.com/profile.php?id=100005590214693	22348402	khawlasoltani223@gmail.com	female	Khawla Soltani	IIA	2
cki7mhe2p0044qf6xzr65mjoi	https://m.facebook.com/yosr.benrouha?ref=bookmarks	27504849	ybenrouha@gmail.com	female	Yosr Ben Rouha	CH	2
cki7mhe2p0045qf6xzvq3eypk	https://www.facebook.com/mahmoud.nefzi.31	53081037	mahmoudhnefzi@gmail.com	male	Mahmoud Nefzi	MPI	1
cki7mhe2p0046qf6xhkd5p96p	https://www.facebook.com/oumayma.ayadi.376	97436606	oumayma0400@gmail.com	female	Oumayma Ayadi	BIO	2
cki7mhe2u0095qf6xhtueyo4b	https://www.facebook.com/tayssir.saoudi	92267169	tayssirsaoudi@gmail.com	female	Tayssir Saoudi	CH	3
cki7mhe2p0047qf6x3lkggwqs	https://www.facebook.com/profile.php?id=100007353077302	50570771	tas.fer10@gmail.com	female	Tasnim Ferchichi	MPI	1
cki7mhe2p0048qf6xg8s16q21	https://m.facebook.com/nadine.benali.16?ref=bookmarks	55239571	nadinebenali.nba@gmail.com	female	Nadine Ben Ali	BIO	2
cki7mhe2p0049qf6x6uehxvty	https://www.facebook.com/zohrakhay99	58895280	zohrakhay999@gmail.com	female	Zohra Khay	RT	3
cki7mhe2p0050qf6xcylmyw45	https://www.facebook.com/oumayma.sakka	27095233	oumayma.sakka@gmail.com	female	Oumayma Sakka	IIA	2
cki7mhe2q0051qf6xkachfgul	https://www.facebook.com/wejden.khay/	29015802	wejkhay@gmail.com	female	Wejden Khay	CH	2
cki7mhe2q0052qf6xw0povigq	https://www.facebook.com/anis.rajhi.nt/	24094947	anisrajhi00@gmail.com	male	Anis Rajhi	IMI	3
cki7mhe2q0053qf6x6jfycr05	https://www.facebook.com/sirine.zaghdoudi.3	21857990	syrine3zaghdoudi@gmail.com	female	Zaghdoudi Syrine	BIO	4
cki7mhe2q0054qf6x3w6d8n0j	https://m.facebook.com/profile.php?id=100008071560912	53821022	ayedtalel@yahoo.com	male	Talel Ayed	MPI	1
cki7mhe2q0055qf6x9af37cfj	https://m.facebook.com/profile.php?id=100005757546246	95262865	saidanemongi@gmail.com	male	Mohamed Mongi Saidane	MPI	1
cki7mhe2q0056qf6xd1beynuq	https://www.facebook.com/aminejouini55	53966904	jouini.amine99@gmail.com	male	Jouini Amine	IIA	2
cki7mhe2q0058qf6xi9u81vbv	https://m.facebook.com/myriam.benismail.3	41555865	meriembenismail@yahoo.com	female	Meriem Ben Ismail	GL	2
cki7mhe2q0059qf6x24qaymjz	https://www.facebook.com/profile.php?id=100006124454903	93995206	kaabachiimen@gmail.com	female	Imen Kaabachi	MPI	1
cki7mhe2q0060qf6xd51fe6sx	https://www.facebook.com/houyem.mokline/	20085435	houyemmokline8@gmail.com	female	Houyem Mokline	CH	3
cki7mhe2r0061qf6x0kvpz0jz	https://www.facebook.com/profile.php?id=100004246217827	50532923	mazenissaoui@insat.u-carthage.tn	male	Mazen Issaoui	GL	2
cki7mhe2r0062qf6x2r5ah4w7	https://www.facebook.com/marwa.sh.169	54080225	marwa.shim.169@gmail.com	female	Shim Marwa	CBA	1
cki7mhe2r0063qf6xtrdb4mk3	https://www.facebook.com/emna.gaidi.3/	28366433	emnagaidii@gmail.com	female	Emna Gaidi	MPI	1
cki7mhe2r0064qf6x0tj9c196	https://www.facebook.com/ouazzen	55306149	hanene.ouazzene@icloud.com	female	Hanene Ouazzene	IMI	3
cki7mhe2r0065qf6xb7w14bps	https://www.facebook.com/benbrikamir	23932266	amirbenbrik98@gmail.com	male	Amir Ben Brik	CH	4
cki7mhe2s0066qf6x2q1ovphk	https://www.facebook.com/profile.php?id=100007461019439	95523940	ifaouiroua@gmail.com	female	Roua Ifaoui	CH	4
cki7mhe2s0067qf6x5qze4r2i	https://m.facebook.com/ines.charradi.108?refid=7	90122454	inescharradi102@gmail.com	female	Ines Charadi	CBA	1
cki7mhe2s0068qf6x6k8ub2sk	https://www.facebook.com/wala.zgh	28004465	walaazoghlemi@gmail.com	female	Wala Zoghlami	CH	3
cki7mhe2s0069qf6xz0ucs82s	https://www.facebook.com/nawel.amera.31	28269226	nawelamera04@gmail.com	female	Nawel Amira	IMI	3
cki7mhe2s0070qf6xmvcoge4o	https://www.facebook.com/profile.php?id=100004775867690	51885255	hazemrbh@gmail.com	male	Hazem Rebhi	IMI	3
cki7mhe2s0071qf6x07s4leb2	https://m.facebook.com/mohamed.sahnoun.545?tsid=0.5136559538494518&source=result	99520965	mouhasahss@gmail.com	male	Mohamed Sahnoun	GL	2
cki7mhe2s0072qf6xds8z9riu	https://www.facebook.com/wissal.khaled.13	29102438	wissalkhaled07@gmail.com	female	Wissal Khaled	CBA	1
cki7mhe2s0073qf6xtgruwlxw	https://www.facebook.com/amira.benattia.9	25292712	amirabenattia24@gmail.com	female	Amira Ben Attia	CH	4
cki7mhe2t0074qf6xihmpmjnd	https://www.facebook.com/syrine.doukali	56771431	doukali_syrine@yahoo.com	female	Syrine Doukali	RT	2
cki7mhe2t0075qf6xzwuybyue	https://www.facebook.com/hanen.hafnaoui.1	53479020	hanenhafnaoui09@gmail.com	female	Hanen Hafnaoui	IMI	3
cki7mhe2t0076qf6xy6l4el6a	https://m.facebook.com/hamda.bessiaes?ref=bookmarks	99300744	hamda.bessaies@gmail.com	male	Hamda Bessaies	MPI	1
cki7mhe2t0077qf6xwbcprrle	https://www.facebook.com/profile.php?id=100008078536950	94616826	amal.massoudi44@gmail.com	female	Amal Massoudi	IMI	3
cki7mhe2t0078qf6xkap4w9a6	https://www.facebook.com/nour.belmabrouk.94/	20673257	nourbelmabrouk11@gmail.com	male	Nour Belmabrouk	GL	3
cki7mhe2t0079qf6x4iucglcg	https://www.facebook.com/profile.php?id=100007850329092	24100090	zeineb.labbane@gmail.com	female	Zeineb Labbane	GL	3
cki7mhe2t0080qf6xhvn62wau	https://www.facebook.com/ahmed.bourguiba.1	92654133	borrhd@gmail.com	male	Ahmed Bourguiba	TI	1
cki7mhe2t0081qf6xr7nc3mt6	https://m.facebook.com/feryel.gwayed?ref=bookmarks	20535883	feryel.gwayed@gmail.com	female	Feryel Gwayed	IMI	3
cki7mhe2t0082qf6x8l5fgbn1	https://www.facebook.com/hadil.mehrez.52	26898706	mehrezhadil4@gmail.com	female	Hadil Mehrez	IMI	3
cki7mhe2t0083qf6x3magmwg4	https://www.facebook.com/mariouma.mimo.796	54645243	mariemthabet29@gmail.com	female	Mariem Thabet	IMI	3
cki7mhe2t0084qf6xx0pdsuzr	\N	55583880	malekbenhmida2699@gmail.com	female	Malèk Ben Hmida	CH	3
cki7mhe2t0085qf6xqtj6c8p6	https://m.facebook.com/home.php?refsrc=https%3A%2F%2Fm.facebook.com%2Fcheckpoint%2F&_rdr	20779184	aichamejlissi2@gmail.com	female	Aicha Mejlissi	CH	3
cki7mhe2t0086qf6xmd1fjspl	https://www.facebook.com/raslen.ansi/	58329309	rasslen.ansi1@gmail.com	male	Rasslen Ansi	MPI	1
cki7mhe2t0087qf6x3lkoi5gc	https://www.facebook.com/meriem.amara.15	52228030	amarameriem2002@gmail.com	female	Meriem Amara	MPI	1
cki7mhe2t0088qf6x0m2z5bso	https://www.facebook.com/mariem.ammar.716	58843614	mariemammar47@gmail.com	female	Ammar Mérièm	BIO	4
cki7mhe2u0089qf6x1zb1bucp	https://m.facebook.com/Syrinech07?ref=bookmarks	25100738	syrinechebbi@icloud.com	female	Syrine Chebbi	CH	3
cki7mhe2u0090qf6xos4u6hr4	https://www.facebook.com/saidiyousser	55614515	juiniyosser9@gmail.com	female	Yosser Saidi	CH	3
cki7mhe2u0091qf6xqy61mdux	https://www.facebook.com/meriam.fdl	92584177	mariem.fadhel@icloud.com	female	Meriam Fadhel	BIO	3
cki7mhe2u0092qf6xeye9t09a	https://www.facebook.com/puupperrr	55577164	ranyaboubich@gmail.com	female	Ranya Boubich	MPI	1
cki7mhe2u0093qf6xvohh80yk	https://www.facebook.com/dhia.mdalla.7	56545548	dhiammdalla@gmail.com	male	Dhia Mdalla	ESSAI	3
cki7mhe2u0094qf6xbyqups58	https://m.facebook.com/rissyat.iuoajeb	23348899	tayssirbejaoui34@gmail.com	female	Bejaoui Tayssir	CH	3
cki7mhe2v0096qf6xwd6rhiz5	https://www.facebook.com/omar.jabloun.5	24229923	omar.jebloun@gmail.com	male	Omar Jabloun	MPI	1
cki7mhe2v0097qf6x6ang14dz	https://www.facebook.com/nour.najjar.93	58983875	nournajjar941@gmail.com	female	Nour Najjar	IMI	3
cki7mhe2v0099qf6xn5v6o3zs	https://www.facebook.com/fatma.guidara.98	28354511	fatma.guidara@insat.u-carthage.tn	female	Fatma Guidara	GL	3
cki7mhe2v0100qf6xd26wfa1o	https://m.facebook.com/azaiz.khalil?ref=bookmarks	27522140	khalilazaiez1@gmail.com	male	Khalil Azaiez	MPI	1
cki7mhe2v0101qf6xz0y0g2wl	\N	25465855	medamirjouini@gmail.com	male	Mohamed Amir Jouini	MPI	1
cki7mhe2v0102qf6xgh80hyou	https://www.facebook.com/maryem.mohsni.58	23843762	meriemmohsni51@gmail.com	female	Maryem Mohsni	CH	3
cki7mhe2v0103qf6xtkl2ci68	https://www.facebook.com/alaeddine.fattouch.77/	95154314	alaeddinefattouch@insat.u-carthage.tn	male	Alaeddine Fattouch	MPI	2
cki7mhe2v0104qf6xyx33dqqj	https://www.facebook.com/med.jdidi.37	92961152	mohamed.jedidi@insat.u-carthage.tn	male	Mohamed Jedidi	IIA	2
cki7mhe2v0105qf6xzl86w3vn	https://www.facebook.com/eya.riden.1	96590181	eya.ridene21@gmail.com	female	Eya Ridene	MPI	1
cki7mhe2w0106qf6xm6u28wro	https://www.facebook.com/IeeeInsatStudentBranch/?__tn__=%2CdkCH-R-R&eid=ARC5A_8Af1NoCoBxhTmFZRyJtBq1TvCs8_XYC60tGE0stRrNTvoCZ3TUn4Aj68-d2EVngSEl14BbfZkN&hc_ref=ARR_T1ajGAT4WYmdHyOTmJOmcnLFzlCdL8MAdooogTmcMe6cN4VrBkqtb6lKlaHOnAg&fref=nf&hc_location=group	23955802	salmaghabri@gmail.com	female	Salma Ghabri	MPI	1
cki7mhe2w0107qf6xj7lzembh	https://m.facebook.com/farah.fersi	53261731	fersifarah3@gmail.com	female	Farah Fersi	CH	3
cki7mhe2w0108qf6xxecyrdc2	https://www.facebook.com/rana.moussaoui.37	21538288	moussaouir55@gmail.com	female	Rana Moussaoui	BIO	2
cki7mhe2w0109qf6xxi734cu5	https://www.facebook.com/amin.fell	95498089	aminfelah@gmail.com	male	Mohammed Amine Felah	GL	3
cki7mhe2w0110qf6xlwcyi6ih	https://www.facebook.com/profile.php?id=100008274004887	93165443	nawresmougou274@gmail.com	female	Nawres Mougou	IIA	3
cki7mhe2w0111qf6xyd9ghiwc	https://www.facebook.com/nonobelhaj	52709932	norhenbelhaj1@gmail.com	female	Nourhen Belhaj	IIA	3
cki7mhe2w0112qf6xkk97yiw9	https://www.facebook.com/rihvb/	55249513	rihab.cheberli@gmail.com	female	Rihab Cheberli	GL	3
cki7mhe2x0113qf6xtc2aist9	https://www.facebook.com/meriem.jardak.7	21322722	meriam.jardak@insat.u-carthage.tn	female	Meriem Jardak	IIA	3
cki7mhe2x0114qf6x0zzrbycm	https://m.facebook.com/jade.weasly?ref=bookmarks	53816959	amalabidi111a@gmail.com	female	Amal Abidi	GL	3
cki7mhe2x0115qf6xlqkcq9ne	https://m.facebook.com/profile.php?id=100002414289075&ref=content_filter	22481243	bghanem.chaima@gmail.com	female	Chaima Ben Ghanem	GL	3
cki7mhe2x0116qf6xjymruled	https://m.facebook.com/maryem.ammar.2?ref=bookmarks	94655977	maryemammar24@gmail.com	female	Ammar Maryem	CBA	1
cki7mhe2x0117qf6x6pa58yxu	https://www.facebook.com/yasrouta.karoui	99181751	yosr.karoui@medtech.tn	female	Yosr Karoui	MPI	2
cki7mhe2x0118qf6x4zas6n45	https://www.facebook.com/mohamed.fersi.5621	28347119	mohamedfersi2012@gmail.com	male	Mohamed Ali Fersi	IIA	4
cki7mhe2x0119qf6xcumbl648	https://www.facebook.com/imfdone	20795485	ttahayyass@gmail.com	male	Taha Yassine Tizaoui	RT	3
cki7mhe2x0120qf6xp9du9ubs	https://www.facebook.com/zied.zribi.7	95252326	ziedzribi122@gmail.com	male	Zied Zribi	IIA	2
cki7mhe2x0121qf6xfianaz1g	https://www.facebook.com/mohamedamine.lol/	26669435	aminebayoudha@gmail.com	male	Mohamed Amine Bayoudha	IIA	2
cki7mhe2x0122qf6xdjmew3n7	https://m.facebook.com/wissem.malleh	23908037	wissem.malleh@gmail.com	male	Wissem Malleh	MPI	1
cki7mhe2y0123qf6xppi5o1i0	https://www.facebook.com/emna.mrad.180/	147467616	emnamrad595@gmail.com	female	Emna Mrad	Tunis Business School (TBS)	1
cki7mhe2y0124qf6x8qsjui5f	\N	53004868	mayssemlebdeoui@gmail.com	female	Lebdeoui Mayssem	CH	2
cki7mhe2y0125qf6xw6drf8o1	https://www.facebook.com/souha.jlassi.10	53962501	jlassi19souha@gmail.com	female	Souha Jlassi	CBA	1
cki7mhe2y0126qf6x8pdyxbl0	https://www.facebook.com/chams.hajji/	55528964	chamshajji599@gmail.com	female	Chams Hajji	IIA	3
cki7mhe2y0127qf6xn2h4dy43	https://www.facebook.com/oussamaomar.mrabet/	50313197	oussamamrabet@live.fr	male	Oussama Omar Mrabet	IMI	3
cki7mhe2y0128qf6x7vs9h6wy	https://www.facebook.com/souhe.zouaghi	54804076	zouaghisouhe@gmail.com	female	Souhe Zouaghi	IIA	3
cki7mhe2y0129qf6x5qvubjyv	https://m.facebook.com/ahmed.oueslati.94	27388859	ahmedoueslati2001@hotmail.com	male	Ahmed Oueslati	MPI	1
cki7mhe2y0130qf6xgrkv762d	https://www.facebook.com/ziada.oussema/	55068561	oussama.ziada01@gmail.com	male	Oussama Ziada	MPI	1
cki7mhe2y0131qf6x3idkhqm0	https://www.facebook.com/ranim.chiha139/	96530338	ranimchiha20@gmail.com	female	Ranim Chiha	IIA	2
cki7mhe2y0132qf6xt1jor9ie	http://www.facebook.com/mahmoud.merye	96197970	mahmoudmeryem13@gmail.com	female	Meryem Mahmoud	RT	3
cki7mhe2y0133qf6x5wlldvlg	https://www.facebook.com/profile.php?id=100005114506476	96699497	chaima9aouichi@gmail.com	female	Chaima Aouichi	RT	2
cki7mhe2y0134qf6xd5sbdurh	https://www.facebook.com/ghofrane.bouzid.7	94696806	bouzidghofrane19@gmail.com	female	Ghofrane Bouzid	IIA	2
cki7mhe2y0135qf6x017v2av9	https://www.facebook.com/doudou113457	58881714	adamdey21@gmail.com	male	Adam Dey	MPI	1
cki7mhe2y0136qf6xw83p66v9	https://www.facebook.com/bilel.khelifi.904	25852832	bilel.khelifi@insat.u-carthage.tn	male	Bilel Khelifi	RT	3
cki7mhe2y0138qf6x60u1huxe	https://www.facebook.com/mariem.cherif.1420	53595695	chrify366@gmail.com	female	Meriam Cherif	RT	2
cki7mhe2y0139qf6x4prhjdjm	https://www.facebook.com/jihene.doudech	58877702	doudechjihene@gmail.com	female	Jihene Doudech	RT	2
cki7mhe2y0140qf6xkoegyadm	https://m.facebook.com/osebri	29437681	osebri2@gmail.com	male	Omar Sebri	MPI	1
cki7mhe2y0141qf6xus7gg1qy	https://www.facebook.com/bensalah.minyar	96301334	minyarbensalah06@gmail.com	female	Minyar Ben Salah	RT	2
cki7mhe2y0142qf6xa544bk0l	https://m.facebook.com/profile.php?id=100007316749000	52470213	maknimariem11@gmail.com	female	Mariem Makni	MPI	1
cki7mhe2y0143qf6xlgeme0qj	https://www.facebook.com/ahmed.abdelhedi.754	52448449	ahmed00abdelhedi001@gmail.com	male	Ahmed Abdelhedi	CBA	1
cki7mhe2z0144qf6xa7j9lkcu	https://www.facebook.com/nermine.khayati.3	29852500	narminekhayatie093@gmail.com	female	Nermyne Khayati	CBA	1
cki7mhe2z0145qf6xhxfu07ps	https://m.facebook.com/bbljihene?ref=bookmarks	52360499	jihenbenbelgacem8@gmail.com	female	Jihen Ben Belgacem	CBA	1
cki7mhe2z0146qf6xltmk1lvx	https://www.facebook.com/syrine.ferchichi.940	24696038	ferchichisyrine334@gmail.com	female	Syrine Ferchichi	CBA	1
cki7mhe2z0147qf6xrhzdncud	https://www.facebook.com/profile.php?id=100005310406109	20076307	erij.toua@gmail.com	female	Erij Touati	MPI	1
cki7mhe2z0148qf6xcfnb0rid	https://www.facebook.com/baggayasser	94309931	yasserbagga1@gmail.com	male	Yasser Bagga	IIA	3
cki7mhe2z0149qf6xzl1mu9ph	https://www.facebook.com/yosra.abdessamed/	23619419	yos.abds1998@gmail.com	female	Yosra Abdessamed	RT	3
cki7mhe2z0151qf6x7he13yss	https://www.facebook.com/Taoufik.Kaabi.55	24505082	taoufikc4@gmail.com	male	Taoufik Kaabi	GL	2
cki7mhe2z0153qf6xdktifp7l	https://www.facebook.com/alae.bouchiba.92	52625277	alaebouchiba551@gmail.com	female	Alae Bouchiba	IIA	2
cki7mhe2z0154qf6xci458okt	https://m.facebook.com/rania.boughanmi.5245?ref=bookmarks	25783319	boughanmirania143@gmail.com	female	Ranya Boughanmi	IMI	2
cki7mhe2z0155qf6x3wv03s0g	https://m.facebook.com/profile.php?id=100006826448287&ref=content_filter	23229495	yassmineriahi77@gmail.com	female	Yassmine Riahi	MPI	1
cki7mhe2z0156qf6xwwjwgmve	https://www.facebook.com/niam.weslati.92/	58414679	niamweslati@gmail.com	female	Niam Oueslati	IIA	2
cki7mhe2z0157qf6xfrpth3qq	https://www.facebook.com/profile.php?id=100009348955894	26629984	karouimajd@outlook.fr	male	Majd Karoui	IIA	1
cki7mhe2z0158qf6x2gzlk0bf	https://m.facebook.com/nour.miliani.9	26001458	nourmiliani123@gmail.com	female	Nour Elhouda Miliani	CBA	1
cki7mhe2z0159qf6xsa14w4ds	https://www.facebook.com/imene.tns.710	20745002	imenetns26@gmail.com	female	Imene Tounsi	CH	3
cki7mhe2z0160qf6xepq8bms1	https://www.facebook.com/ahmedmahf0udhi/	56758399	kacemmahfoudhi@gmail.com	male	Ahmed Mahfoudhi	GL	2
cki7mhe2z0161qf6xa9tbvxp0	https://www.facebook.com/nouha.blidi.1	96161854	nouha.blidi544@gmail.com	female	Nouha Blidi	MPI	1
cki7mhe2z0162qf6xtxeozqxo	https://m.facebook.com/chaima.sahli.77?ref=bookmarks	29412777	sahlichaima10@gmail.com	female	Chaima Sahli	CBA	1
cki7mhe2z0163qf6xwna5memv	https://www.facebook.com/ommi2.pqt	20229423	eyaabh56@gmail.con	female	Aya Bouhlila	CH	2
cki7mhe2z0164qf6xonbwdftt	https://www.facebook.com/maher.mzoughi.311	25298643	mahermzou673@gmail.com	male	Maher Mzoughi	CH	3
cki7mhe2z0165qf6xuwrrfij9	https://www.facebook.com/chayma.oueslati.144	97434007	oueslatichayma2000@gmail.com	female	Chayma Oueslati	MPI	1
cki7mhe300166qf6xub213f0r	https://www.facebook.com/medamine.karoui.50	52900518	med.amine.karoui@gmail.com	male	Med Amine Karoui	IIA	2
cki7mhe300167qf6xh0vfi9cq	\N	29052142	asmaferchychy@gmail.com	female	Asma Ferchichi	CH	2
cki7mhe300168qf6xce82gn40	https://www.facebook.com/chaima.chaimouma.988926	27887692	bmhchaima@gmail.com	female	Ben Mohamed Chaima	CBA	1
cki7mhe300169qf6xkyab4400	https://www.facebook.com/sourour.bnhnya	50060194	intidharbenhnia@gmail.com	female	Intidhar Ben Hnia	MPI	1
cki7mhe300170qf6xh3wnfo8v	https://www.facebook.com/marzouk.amira.5/	54668417	amiramarzouk67@gmail.com	female	Amira Marzouk	CBA	1
cki7mhe300171qf6xarecjcnp	https://m.facebook.com/sirine.jnyh	94700357	www.sirinejnayehh@gmail.com	female	Sirin Jnayeh	CBA	1
cki7mhe300172qf6xw90devfd	https://m.facebook.com/ismail.zitouni.374?ref=bookmarks	99643418	ismail.zit@gmail.com	male	Ismail Zitouni	CBA	1
cki7mhe300173qf6xy1vuelrg	https://www.facebook.com/sofienne.azzabi	21962106	sofien.azzabi2@gmail.com	male	Azzabi Sofiene	MPI	1
cki7mhe300174qf6xc3xi7kcy	https://www.facebook.com/houssem.hammemi11/	90374537	houssem.hammemi7@gmail.com	male	Houssem Hammami	IMI	3
cki7mhe300175qf6xn4k7t8hd	https://www.facebook.com/yasmine.hammami.792	53596973	yasminehammami0@gmail.com	female	Yasmine Hammami	CBA	1
cki7mhe300176qf6x2dvmjekd	https://m.facebook.com/mariem.khemiri.16	54992726	khmirim853@gmail.com	female	Mariem Khemiri	CH	3
cki7mhe300177qf6xrh9k3a0c	https://www.facebook.com/asma.hathroubi.3	53162470	asma.hathroubi1@outlook.fr	female	Hathroubi Asma	BIO	3
cki7mhe300178qf6xutvfsa9b	https://www.facebook.com/eloula.mjid	22155729	alla.mjid.1999@gmail.com	female	Mjid Elaa Mjid Elaa	BIO	3
cki7mhe300179qf6xbzrsod8b	https://m.facebook.com/profile.php?id=100005320595091	50504361	baccari.contact@gmail.com	male	Baccari Mohamed Amine	BIO	3
cki7mhe300180qf6x4bnl20aj	https://m.facebook.com/ilef.megriche?locale2=fr_FR	52113034	ilef.megrich@gmail.com	male	Megriche Ilef	CBA	1
cki7mhe300181qf6xbv5k25nc	https://www.facebook.com/farah.maalej.39	26891202	farahmaalej07@gmail.com	female	Farah Maalej	MPI	1
cki7mhe300182qf6xpk4pdtmr	https://www.facebook.com/mahdi.chaari.75/	20352202	mahdi125@outlook.com	male	Mahdi Chaari	MPI	1
cki7mhe300184qf6xyyiyjngo	https://www.facebook.com/profile.php?id=100007445087264	93812714	ahmadkallel1407@gmail.com	male	Ahmed Kallel	MPI	1
cki7mhe300185qf6xtqus6ocu	https://www.facebook.com/wissem.yousfi.731	23115182	yousfiwissem224@gmail.com	male	Wissem Yousfi	MPI	1
cki7mhe300186qf6xdk02rh2g	https://m.facebook.com/ahmed.benaissa.9041083	21005090	ahmedbenaissa0101@gmail.com	male	Ahmed Ben Aissa	MPI	1
cki7mhe300187qf6xya58q8o4	https://www.facebook.com/dorsaf.madani.79	96120617	madanidorsaf@gmail.com	female	Madani Dorsaf	IMI	1
cki7mhe310188qf6xeyovq690	https://m.facebook.com/profile.php?id=100042284272354	92942900	inesbensalah009@yahoo.com	female	Inès Ben Salah	CBA	1
cki7mhe310189qf6xvh8emakx	https://m.facebook.com/maissene.zairi	52325452	maissen.zairi@gmail.com	male	Maissen Zairi	MPI	1
cki7mhe310190qf6xunk90yu1	https://www.facebook.com/RayenlGhali/	54699525	rayen.ghali@insat.u-carthage.tn	male	Rayen Ghali	IMI	3
cki7mhe310191qf6xoaqjw13x	https://www.facebook.com/naissouna	93720630	rayhanenawara@gmail.com	female	Naicen Naouara	BIO	3
cki7mhe310192qf6x9w1tx8rl	https://www.facebook.com/malek.zg.5/	25162761	zaag.malek1@gmail.com	male	Malek Zaag	RT	2
cki7mhe310193qf6xtxm22c89	https://www.facebook.com/profile.php?id=100010256682931	41616616	yessinejallouli08@gmail.com	male	Yessine Jallouli	MPI	1
cki7mhe310194qf6x9flnfa1d	https://www.facebook.com/mehdi.cherif8	58672520	cherifmehdi706@gmail.com	male	Mehdi Cherif	MPI	1
cki7mhe310195qf6xo6tz1d8c	https://www.facebook.com/chayma.moualhi.3/	26527227	moualhi.chayma@yahoo.com	female	Chayma Moualhi	MPI	1
cki7mhe310196qf6xr96a72mo	https://m.facebook.com/may.farhat.35?ref=bookmark	26722818	mayf845@gmail.com	female	May Farhat	IIA	2
cki7mhe310197qf6xzuj3cwf7	https://www.facebook.com/adem.skandrani	50929116	skandrani.adem@gmail.com	male	Skandrani Adem	IIA	2
cki7mhe310198qf6xgpl9hh2h	https://m.facebook.com/youssef.khemakhem.73?ref=bookmarks	44112680	youssefkhemakhem@gmail.com	male	Youssef Khemakhem	IIA	4
cki7mhe310199qf6xkoh6q4sa	https://www.facebook.com/zayani.mehdi/	58696221	zayanimehdi@yahoo.fr	male	Mehdi Zayani	IIA	3
cki7mhe310200qf6xvz33ams3	https://www.facebook.com/abir.a.abir.5	54696880	abirgouissem10@gmail.com	female	Abir Gouissem	IMI	3
cki7mhe310201qf6x03wbzjop	https://www.facebook.com/asma.bslh.7	50568615	asmabousleh@yahoo.fr	female	Asma Ben Bousleh	BIO	3
cki7mhe310202qf6xdg9idk6p	https://www.facebook.com/teyssir.sleimi	99246683	tey.sleimi@gmail.com	female	Teyssir Sleimi	CH	3
cki7mhe310203qf6xs2fxcbwp	https://www.facebook.com/profile.php?id=100005050217653	152208764	absouhaylab@outlook.fr	male	Souhaiel Bettaher	CH	3
cki7mhe310205qf6xxx4xzbmd	https://m.facebook.com/ahmed.zouari.370	56328518	ahmedzouari.insat@gmail.com	male	Ahmed Zouari	IMI	2
cki7mhe310206qf6xpduh4msz	https://www.facebook.com/fedisfar/	29665746	gandourafedi@hotmail.com	male	Fedi Sfar Gandoura	IMI	3
cki7mhe310207qf6xn464g73y	https://www.facebook.com/ines.zghal.50	29361209	zghalines039@gmail.com	female	Ines Zghal	MPI	1
cki7mhe310208qf6x7o2mjppr	https://m.facebook.com/achraf.triki.714?ref=bookmarks	27070975	achraf.triki432@gmail.com	male	Achraf Triki	MPI	1
cki7mhe320209qf6xqkduz9vw	https://www.facebook.com/eya.bentaleb.9/	27022528	eya.bentaleb@gmail.com	female	Eya Ben Taleb	CH	3
cki7mhe320210qf6xza3kh4dm	https://www.facebook.com/ahmed.cherif.92167	95426023	ahmedcherif626@gmail.com	male	Ahmed Cherif	MPI	1
cki7mhe320211qf6xtcglry0w	https://www.facebook.com/sellami.lobna.1	55770435	lobnasellami7@gmail.com	female	Lobna Sellami	RT	2
cki7mhe320212qf6xbttr4a1z	https://www.facebook.com/hamza.sdiri.148/	27710115	sdirihamza241@gmail.com	male	Hamza Sdiri	GL	2
cki7mhe320213qf6xmg74jmut	https://www.facebook.com/hamza.memmi.50/	93942243	memmihamza93@gmail.com	male	Hamza Memmi	2éme informatique , esprit	2
cki7mhe320214qf6xqbddipxh	https://www.facebook.com/aziz.chedli.184/	26066932	aziz.taylor10@gmail.com	male	Mohamed Aziz Chedhli	IMI	2
cki7mhe320215qf6xgpkhv0vv	https://m.facebook.com/profile.php?id=100009385703615&ref=content_filter	27117893	aichachebbi07@gmail.com	female	Aïcha Chebi	MPI	1
cki7mhe320216qf6xqxy5780e	https://www.facebook.com/nour.hajri.5	99983338	binthajri@gmail.com	female	Nour Hajri	CH	3
cki7mhe320217qf6x4of3gu1a	https://www.facebook.com/aya.mallat.3517	58688514	ayamallat2019@gmail.com	female	Eya Mallat	MPI	1
cki7mhe320218qf6x67ltwu2q	https://www.facebook.com/souissi.eya.33	53895400	souissieya01@gmail.com	female	Eya Souissi	IIA	2
cki7mhe320219qf6xul26av37	https://www.facebook.com/nada.hrichi.1	28707984	nadahrichi2@gmail.com	female	Hrichi Nada	IMI	2
cki7mhe320220qf6xpf1un3cg	https://www.facebook.com/tesnim.tesnouma.7	50169038	tesnim.kharbech@gmail.com	female	Tesnim Kharbéch	IIA	2
cki7mhe320221qf6xvm334pt6	https://www.facebook.com/Semah.gh	23432985	elghoulsemah@gmail.com	male	Semah El Ghoul	BIO	2
cki7mhe320222qf6xp7yopgxe	https://www.facebook.com/mohamed.yassine.brahem/	26988838	mohamedyassinebrahem@gmail.com	male	Mohamed Yassine Brahem	IMI	3
cki7mhe320223qf6x212np1ac	https://www.facebook.com/ismail.said.7731/	55944716	ismailsaid570@gmail.com	male	Ismail Said	MPI	1
cki7mhe320224qf6x4j2npjgi	https://www.facebook.com/Mejdi.Hammami	99376154	hammami.mejdi@gmail.com	male	Mejdi Hammami	IMI	3
cki7mhe320225qf6xf5qfd63t	https://www.facebook.com/hayfa.benomrane/	27620061	hayfabenomrane16@gmail.com	female	Hayfa Ben Omrane	BIO	3
cki7mhe320226qf6xm8bw9zy5	https://m.facebook.com/ines.besrour.3?ref=bookmarks	55675577	inesbes2001@gmail.com	female	Inès Besrour	MPI	1
cki7mhe320227qf6xsc8mg28b	https://www.facebook.com/profile.php?id=100005138476203	26845253	oachour08@gmail.com	male	Achour Oussama	MPI	1
cki7mhe320228qf6xohw2s2jf	\N	58312009	arabickhalil@gmail.com	male	Khalil Lakhoua	MPI	1
cki7mhe330229qf6xysibm4hk	https://www.facebook.com/imen.touati.07	55507177	imentouati@outlook.com	female	Imen Touati	IIA	3
cki7mhe330230qf6xuqi8rjm8	https://www.facebook.com/khemissi.tn	146062315	amir.khemissi@insat.u-carthage.tn	male	Khemissi Amir	RT	3
cki7mhe330231qf6x8j2696fn	https://m.facebook.com/qatrenada.lahbib.5	26207951	qatrenadalahbib2@gmail.com	female	Qatrenada Lahbib	RT	3
cki7mhe330232qf6xwubbahmy	https://www.facebook.com/kenzo.gharbi	21321533	kenzagharb@gmail.com	female	Kenza Gharbi	MPI	1
cki7mhe330233qf6xsshmx70j	https://m.facebook.com/yassine.gargouri.3726?ref=bookmarks	52715271	gargouri22@icloud.com	male	Yassine Gargouri	IMI	2
cki7mhe330234qf6x13cq341y	https://www.facebook.com/malak.chefrid	94278614	malakchefrid@gmail.com	female	Malak Chefrid	IIA	2
cki7mhe330235qf6xcrttkqnq	https://m.facebook.com/profile.php?id=100009402504123	55269507	leiladridi2001@yahoo.fr	female	Leila Dridi	MPI	1
cki7mhe330236qf6xwu4q8bld	https://m.facebook.com/mohamed.mohamedfiras	99681755	medfirasmed1@gmail.com	male	Mohamed Firas Mohamed	IMI	2
cki7mhe340237qf6xjmdrzo6n	https://www.facebook.com/mohamed.gahbiche.7	52322832	mouhagahbiche2@gmail.com	male	Mohamed Lahbib Bouraoui Gahbiche	IMI	2
cki7mhe340238qf6xxe35mo49	https://www.facebook.com/ines.tarsim.7	56086287	inestarsim16@gmail.com	female	Tarsim Ines	BIO	3
cki7mhe340239qf6xkn021tfu	https://www.facebook.com/syrine.trabelssi.12	96210708	cyrinetrabelsi.10@gmail.com	female	Cyrine Trabelsi	BIO	3
cki7mhe340240qf6xn46lallf	https://www.facebook.com/ines.charrad	28577697	charradines26@gmail.com	female	Ines Charrad	BIO	3
cki7mhe350241qf6xsbka9cir	https://www.facebook.com/chedihammami10/	175910522	chedihammami9@gmail.com	male	Chedi Hammami	RT	3
cki7mhe350242qf6xhx3fr3rx	https://facebook.com/racem.benrhayem	99430905	rassouma74@gmail.com	male	Racem Benrhayem	GL	2
cki7mhe350243qf6x36hzq1vd	\N	90738446	eyaoues19@gmail.com	female	Oueslati Eya	CH	3
cki7mhe350244qf6xo9j5yi1d	https://www.facebook.com/oumayma.rmdhn/	22037993	mimou6429@gmail.com	female	Romdhane Oumayma	MPI	1
cki7mhe360245qf6xflg1dlaj	https://www.facebook.com/ayabenadel	55107211	ayabenadel1@gmail.com	female	Eya Wesleti	MPI	1
cki7mhe360246qf6xe0hpcmbh	https://www.facebook.com/yaassmine.zm	25517044	yasminezman415@gmail.com	female	Yasmine Zmantar	BIO	3
cki7mhe360247qf6x7x1s4tke	https://www.facebook.com/najla.khoualdi.37	56926931	najlakoualdi@gmail.com	female	Najla Khoualdi	IIA	3
cki7mhe360248qf6x0nyi67v7	https://www.facebook.com/fati.sa.7547	96084924	fatmasaadaoui20@gmail.com	female	Fatma Nour El Houda Saadeoui	CBA	1
cki7mhe360249qf6xpt42pu86	https://wwe.facebook.com/mohamed.chourou.965	44909045	chtourou.snok@gmail.com	male	Mohamed Chtourou	IIA	2
cki7mhe360250qf6x2mytu08l	https://www.facebook.com/chedy.hm	20715154	chedyhammami@yahoo.com	male	Chedy Hammami	RT	3
cki7mhe370251qf6x3c1m66q8	https://www.facebook.com/profile.php?id=100004007467805	92178718	helasboui55@gmail.com	female	Hela Sboui	CBA	1
cki7mhe370252qf6xnv2x6z7d	https://www.facebook.com/marwen.benjmeaa/	96553092	marwenbenjmeaa53@gmail.com	male	Marwen Ben Jmeaa	MPI	1
cki7mhe370253qf6xxmofbdl2	https://www.facebook.com/medali.pic/	94723063	dalissj1@gmail.com	male	Mohamed Ali Sahnoun	GL	2
cki7mhe370254qf6xb1oipqee	https://www.facebook.com/syrine.kallel.33	21608244	syrinekalloul@gmail.com	female	Syrine Kallel	business administration	1
cki7mhe370255qf6xy7o28u5u	https://m.facebook.com/aziz.kacem.7	96952666	abdelaziz.kacem47@gmail.com	male	Aziz Kacem	MPI	1
cki7mhe370256qf6x9k40hv36	https://www.facebook.com/zeineb.taher.9	92380203	zeinebtahar@yahoo.com	female	Zeineb Taher	BIO	3
cki7mhe370257qf6xkkl7xoj9	https://www.facebook.com/balkis.karoui.35	28691833	balkiskaroui123@gmail.com	female	Karoui Balkis	IMI	2
cki7mhe370258qf6xh2sjtpjv	https://www.facebook.com/go1out2now3	52301340	cacknoob@gmail.com	male	Kouki Omar	IMI	2
cki7mhe370259qf6x9uxv0jgt	https://www.facebook.com/farah.hamraoui1	54137045	52017426farah@gmail.com	female	Farah Hamraoui	IMI	3
cki7mhe380260qf6xlleilfrt	https://www.facebook.com/hj.imen.71	56081359	imen.hajri@outlook.com	female	Imen Hajri	MIQ	2
cki7mhe380261qf6xx23x4j8e	https://www.facebook.com/profile.php?id=100006466989938	99849514	mradbelsen5@gmail.com	female	Belsen Mrad	CBA	1
cki7mhe380262qf6x842t1w23	https://www.facebook.com/hana.moalla.798	94320218	moallahana22@gmail.com	female	Hana Moalla	BIO	3
cki7mhe380263qf6xhtvlkuob	https://facebook.com/sofiene.chihy	27081196	chihisofiene2@gmail.com	male	Sofiene Chihi	RT	3
cki7mhe380264qf6x0epy6ovr	https://www.facebook.com/feriel.hamrouni.5	98200969	ferielhamrouni1606@gmail.com	female	Feriel Hamrouni	CBA	1
cki7mhe380265qf6xyx3iicdb	https://www.facebook.com/machmouma.bouaziz	53347317	chaimabouaziz99@gmail.com	female	Chaima Bouaziz	RT	3
cki7mhe380266qf6xzmpxthuh	\N	54455067	nermine800@gmail.com	female	Nermine Gharbi	IIA	2
cki7mhe380267qf6xdgaaa6fj	https://www.facebook.com/ghada.kefi948	99564265	ghadakefi900@gmail.com	female	Ghada Kefi	CBA	1
cki7mhe380268qf6xml74b6hr	https://m.facebook.com/profile.php?id=100001801035609&ref=content_filter	99143900	chaima.benamor1@gmail.com	female	Chaima Ben Amor	IMI	3
cki7mhe380269qf6xox4em3j3	https://www.facebook.com/nesrine.boulares	24981658	nesrineboulares@outlook.com	female	Nesrine Boulares	CBA	1
cki7mhe380270qf6xl7yhih4p	https://www.facebook.com/arijkouki123	23409451	arijkouki17@gmail.com	female	Arij Kouki	MPI	1
cki7mhe380271qf6xahmafd8k	https://m.facebook.com/tounsi.abdou4	95253310	tounsiabderrahmene11@gmail.com	male	Abderrahmen Tounsi	BIO	3
cki7mhe380272qf6xygattma2	https://www.facebook.com/cyrine.ayarii	27066496	syrine.ayari2020@gmail.com	female	Cyrine Ayari	CBA	1
cki7mhe390273qf6xb5u9ryhy	https://www.facebook.com/wejden.jlassi	53979854	wejdenjlassi4@gmail.com	female	Wejden Jlassi	IIA	3
cki7mhe390274qf6x50xtjkxe	https://www.facebook.com/mohamed.samali.3	99013766	hama041248@gmail.com	male	Mohammed Samali	IIA	3
cki7mhe390275qf6xa0z79f28	\N	23858401	aziza.mnallah@gmail.com	female	Aziza Mnallah	CH	3
cki7mhe390276qf6xi6nzrfc7	https://www.facebook.com/tesnim.touihri	21733730	tesnimtouihri10@gmail.com	female	Tesnim Touihri	MPI	1
cki7mhe390277qf6xbfcs58do	https://www.facebook.com/profile.php?id=100014972973403	29181400	eya.ayed24@gmail.com	female	Eya Ayed	BIO	2
cki7mhe390278qf6xnxe203j4	https://m.facebook.com/?_rdr#!/aymen.nasri.10?ref=bookmarks	99949089	aymennas18@gmail.com	male	Aymen Nasri	IIA	3
cki7mhe390279qf6xes3m1hr5	https://m.facebook.com/?_rdr#!/ShaymaBagga?tsid=0.13466981718617954&source=result	50882199	shayma99bagga@gmail.com	female	Shayma Bagga	IMI	2
cki7mhe3a0280qf6xf1701vuv	https://aww.facebook.com/mohamed.tth	27476245	mohamedfligene97@gmail.com	male	Mohamed Fligene	CBA	1
cki7mhe3a0281qf6xslf159n5	https://m.facebook.com/alaa.ft.19398?ref=bookmarks	27585670	alaa.touati98@gmail.com	female	Alaa Touati	BIO	4
cki7mhe3a0282qf6xmggdcbml	https://www.facebook.com/aziz.lahiani1	93377930	azizlahiani@gmail.com	male	Lahiani Aziz	IIA	2
cki7mhe3a0283qf6xqzrlwwr3	https://www.facebook.com/jouini.kaouther/	53532581	kaouther.jouini@outlook.fr	female	Kaouther Jouini	CH	2
cki7mhe3a0284qf6xg8bl1aaq	https://www.facebook.com/yassin.lassoued.5/	97523133	yassinlassoued@insat.u-carthage.tn	male	Lassoued Yassine	GL	3
cki7mhe3a0285qf6xdd01bdtu	https://www.facebook.com/bouhour.dhouib.75	24045386	bouhourdhouib@hotmail.com	female	Bouhour Dhouib	IMI	4
cki7mhe3b0286qf6xsm9eaz2q	https://www.facebook.com/dalel.jertila.5	54686433	dalelejertila.tn@gmail.com	female	Dalel Jertila	IMI	4
cki7mhe3b0287qf6xzhb18gmo	https://m.facebook.com/sana.jebali.73?ref=bookmarks	26436114	sanajebali26@gmail.com	female	Sana Jebali	CH	2
cki7mhe3b0288qf6xicrp41ue	https://www.facebook.com/othmen.derouiche/	42312122	othmenderouiche@gmail.com	male	Othmen Derouiche	IIA	2
cki7mhe3b0289qf6xkjlwwf91	https://m.facebook.com/profile.php?id=100000622880683	23050122	sarah.benabdallah@planet.tn	female	Sarah Benabdallah	RT	3
cki7mhe3b0291qf6xsehovhya	https://www.facebook.com/Marwen.Hihi33/	50720345	hihi.marwen@outlook.fr	male	Marwen Hihi	RT	3
cki7mhe3b0292qf6xc9edzc7v	\N	96417895	safaweslati97@gmail.com	female	Safa Oueslati	MPI	1
cki7mhe3b0293qf6x9ws3n9p8	https://www.facebook.com/profile.php?id=100020186874762	53111032	khalil.soltani@edu.isetcom.tn	male	Khalil Soltani	rst	3
cki7mhe3b0294qf6x0p4fwi9z	https://www.facebook.com/sindabenmarzouk	93993047	sindaabenmarzouk@gmail.com	female	Sinda Ben Marzouk	GL	3
cki7mhe3b0295qf6xf8ngavd5	https://www.facebook.com/salma.hertelli.1	94509463	shertelli77@gmail.com	female	Salma Hertelli	MPI	1
cki7mhe3b0296qf6xns0aycz8	https://www.facebook.com/talelchebb/	29703772	talelchebbi090@gmail.com	male	Talel Chebbi	RT	3
cki7mhe3b0297qf6xck3gjkgh	https://www.facebook.com/khadija.lm.98	24362963	khadijalimem9@gmail.com	female	Khadija Limem	Igs3	3
cki7mhe3b0298qf6xv9om3ke9	https://www.facebook.com/profile.php?id=100005418977492	53818333	mariembenatallah@gmail.com	female	Mariem Ben Atallah	MPI	1
cki7mhe3c0299qf6x72xi9bv2	https://www.facebook.com/mohamedaziz.bouzid	21230045	mohamedazizbouzid@gmail.com	male	Mohamed Aziz Bouzid	MPI	1
cki7mhe3c0300qf6xhrplhjbb	https://www.facebook.com/yasmina.saidi.33/	23694032	yasmina.saidi01@gmail.com	female	Yasmina Saidi	RT	3
cki7mhe3c0301qf6xgbsl5qq6	https://www.facebook.com/rayen.tellissi	25717709	rayentellissi99@gmail.com	male	Rayen Tellissi	IIA	3
cki7mhe3c0302qf6xtta2isfj	https://www.facebook.com/nermine.becha.01/	52314731	nerminebachaa@gmail.com	female	Nermine Becha	MPI	1
cki7mhe3c0303qf6xk9cm73uk	https://www.facebook.com/mohamed.heni.908	29661237	mohamedheni2k20@gmail.com	male	Mohamed Heni	MPI	1
cki7mhe3c0304qf6xcmkrlbw6	https://www.facebook.com/maram.boufaroua/	53355814	maram.studies@gmail.com	female	Maram Boufaroua	MPI	1
cki7mhe3c0305qf6xl1ug07ae	https://www.facebook.com/chayma.khenissi.9	54409244	chaymaakhenissi@gmail.com	female	Khenissi Chayma	IIA	3
cki7mhe3c0306qf6x0vguloh4	https://www.facebook.com/profile.php?id=100008553690886	95019247	dalassboussetta@gmail.com	male	Iheb Boussetta	CBA	1
cki7mhmqu1232qf6x2c5hu3mf	\N	52359215	imed.bs@live.fr	male	Imed Eddine Ben Slimene	\N	\N
cki7mhmqw1252qf6xgagp95gy	\N	23748823	Amoura-tounsi@hotmail.com	female	Amira Tounsi	BIO	4
cki7mhe2n0024qf6xraviygxl	https://www.facebook.com/slimene.abir0	93711700	slimeneabir7@gmail.com	female	Abir Slimene	BIO	2
cki7mhmqv1248qf6x5gmymowo	\N	20400417	Mahdiibouaziz@gmail.com	male	Mohamed Mahdi Bouaziz	\N	\N
cki7mhmqw1255qf6x0ppgctw0	\N	54651807	Trabelsiachref465@gmail.com	male	Achref Trabelsi	\N	\N
cki7mhe3b0290qf6xo03ey97y	https://www.facebook.com/Yassine.Chamkhi99	25061475	yessinechamkhi@gmail.com	male	Yassine Chamkhi	RT	3
cki7mhmqw1258qf6x9htip4dm	\N	26908536	Maissa.gharbi11@gmail.com	female	Maissa Gharbi	GL	3
cki7mhmqw1256qf6xa2ykxz5s	\N	55232792	manelreghima@gmail.com	female	Manel Reghima	\N	\N
cki7mhmqv1237qf6xoo919898	\N	29702501	bendalybacem@ieee.org	male	Bacem Ben Daly	GL	3
cki7mhmqx1264qf6xzd79zcc4	\N	93114913	meznihiba1998@gmail.com	female	Hiba Mezni	\N	\N
cki7mhmqw1259qf6xz35k0wl1	\N	27221096	oussemazouaghi@insat.u-carthage.tn	male	Oussema Zouaghi	GL	3
cki7mhmqw1260qf6x80oxt7gy	\N	92228065	Assilbchini731@gmail.com	female	Assil Bchini	\N	\N
cki7mhe2y0137qf6x16co6g1k	https://www.facebook.com/mouna.khiari.54/	27982959	mounakhiari9@gmail.com	female	Mouna Khiari	IIA	3
cki7mhmqu1229qf6xfhb4u7g8	\N	29095950	houssi301@gmail.com	male	Houssem Zitoun	\N	\N
cki7mhe2q0057qf6x0f84pdh7	https://www.facebook.com/yassine.ayadi.33/	50666585	ayadi.yassine15@gmail.com	male	Yassine Ayadi	RT	3
cki7mhmqx1261qf6x50s8kstl	\N	97286610	chaima-soui@gmail.com	female	Chaima Soui	\N	\N
cki7mhmqv1246qf6xvvmgsmnq	\N	99448530	kaboubioumaima@gmail.com	female	Oumaima Kboubi	\N	\N
cki7mhe300183qf6x7adlapp0	https://www.facebook.com/amrouch.jridi/	55479319	amrouch_jridi@hotmail.fr	male	Omar Jridi	GL	3
cki7mhmqx1266qf6x94p5h3t3	\N	50566375	belhajali.amine@gmail.com	male	Amine Haj Ali	GL	3
cki7qlkll0024m46xo6xolroj	\N	29112729	benzinoubamahdi@gmail.com	male	Mahdi Ben Zinouba	\N	\N
cki7mhmqu1236qf6xo0vo0k7s	\N	22439824	aziz.allouche1999@gmail.com	male	Aziz Allouche	IIA	3
cki7mhmqw1251qf6x08rddtd6	\N	20622574	ramezbenaribia@gmail.com	male	Ramez Ben Aribia	\N	\N
cki7mhmqv1240qf6xconca5co	\N	92448448	aichahedda2000@gmail.com	female	Aicha Hedda	\N	\N
cki7mhmqw1253qf6xdmk0bbaq	\N	27140593	Driouechiheb@gmail.com	male	Iheb Driouech	\N	\N
cki7mhmqu1235qf6x47telful	\N	26019093	Mghirbiilef1999@gmail.com	female	Ilef Mghirbi	IIA	3
cki7mhmqx1270qf6xnuut0k39	\N	99335413	imenkoubaa206@gmail.com	female	Imen Koubaa	IIA	4
cki7mhmqx1269qf6xpom2doqb	\N	55739158	mariembrahem99@gmail.com	female	Mariem Brahem	\N	\N
cki7mhmqv1241qf6xf72s1quk	\N	93800438	ahmed.louati.999@gmail.com	male	Ahmed Louati	IIA	3
cki7mhe310204qf6xd15afeol	https://www.facebook.com/selma.ayachi	99770008	salmaayachi987@gmail.com	female	Selma Ayachi	RT	3
cki7mhmqx1265qf6x3fbfjso9	\N	58945105	amine.feki.10@gmail.com	male	Amine Feki	IIA	4
cki7mhmqv1244qf6xmuwh1h82	\N	22378743	emnahdili20@gmail.com	female	Emna Hedhili	\N	\N
cki7mhmqv1243qf6x6tiywft8	\N	92712714	mohamedalizormati@insat.u-carthage.tn	male	Mohamed Ali Zormati	\N	\N
cki7q0chv0001m46x77ptg0vf	\N	54809800	belgaied.nour@gmail.com	female	Nour Belgaied	\N	\N
cki7mhe2z0152qf6x0c6mz9y2	https://www.facebook.com/bochrabachrouch.feki	25300602	fekibochra5@gmail.com	female	Bochra Feki	GL	3
cki7mhmqw1254qf6xy92gtqrk	\N	92629526	mariambeji@gmail.com	female	Mariam Beji	IIA	3
cki7mhe2z0150qf6x07g7wwwb	https://www.facebook.com/ahmed.grati.739/	25042021	ahmedgrati1999@gmail.com	male	Ahmed Grati	GL	3
cki7mhmqv1238qf6xo42ize1k	\N	26423386	benhassinesouha999@gmail.com	female	Souha Ben Hassine	\N	\N
cki7mhe2v0098qf6xizx98pnv	https://www.facebook.com/kmar.mhiri.3	54813538	kmarmhiri13@gmail.com	female	Kmar M'hiri	IMI	3
cki7mhmqv1247qf6xuyhg5no2	\N	54256731	hibahibamili@gmail.com	female	Hiba Mili	\N	\N
cki7mhmqx1267qf6xqog00ob5	\N	50396413	emna.guesmi765@gmail.com	female	Emna Guesmi	\N	\N
cki7mhmqu1230qf6xdetlbr0z	\N	28455462	anisbenghanem0@ieee.org	male	Anis Ben Ghanem	RT	4
cki7mhmqv1245qf6xg33xr00d	\N	27845783	wadhah.mahroug15@gmail.com	male	Wadhah Mahrouk	GL	3
cki7mhmqv1249qf6xge4lb5w3	\N	26360444	ghorbel.oussema99@gmail.com	male	Oussema Ghorbel	RT	3
cki7mhmqu1234qf6xavne8rjr	\N	53737757	saaidiafarouk28@gmail.com	male	Farouk Saaidia	BIO	3
cki7mhmqu1231qf6xazbnrbde	\N	56160474	nawelbouaziz9@gmail.com	female	Nawel Bouaziz	\N	\N
cki7mhmqw1257qf6xoepohuvl	\N	53927800	benhamidaessia@gmail.com	female	Essia Ben Hamida	\N	\N
cki7mhmqw1250qf6xaqhag1tk	\N	26301972	ayajeaidi99@gmail.com	female	Aya Jeaidi	BIO	4
cki7mhmqx1268qf6xpcdok7pw	\N	58204874	tibaouerfelli3@gmail.com	female	Tiba Ouerfelli	\N	\N
cki7mhmqv1239qf6xvbg9l0xr	\N	53634323	emnabargui@gmail.com	female	Emna Bargui	\N	\N
cki7mhmqu1233qf6xn4p24r16	\N	96343843	eyaabid90@gmail.com	female	Eya Abid	RT	3
cki7mhmqx1262qf6x47gf8znb	\N	54493589	nefzizayneb17@gmail.com	female	Zeineb Nefzi	\N	\N
cki7mhmqx1263qf6x0p0tvj8r	\N	21801452	azizsaidane747@yahoo.com	male	Aziz Saidane	\N	\N
cki7mhmqv1242qf6xm5icchhm	\N	51053478	darghouthi.rihab@gmail.com	female	Rihab Darghouthi	\N	\N
cki7q0chv0002m46xo46cypfb	\N	56244589	kaabiamani98@gmail.com	female	Amani Kaabi	\N	\N
\.


--
-- Data for Name: MemberBadge; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."MemberBadge" ("imageDriveId", "memberId", id, wave) FROM stdin;
10Ny-ic21LvaEbBVc0-bw_QfUhqSV8i-4	cki7mhmqw1252qf6xgagp95gy	1	1
113yhA3C0GapbIdMfRbXOJ0usS1WOc0iO	cki7mhmqu1232qf6x2c5hu3mf	2	1
11KKM0o2sYnrvUOhkO4FPMtk8sNpnfYVG	cki7mhe2n0024qf6xraviygxl	3	1
13_se-JE5Itlj9vbBXdbrEpxJxBigCZsE	cki7mhmqv1247qf6xuyhg5no2	4	1
13saPThkFgbd1fn1la4IZGx8UaTP1BQ2Q	cki7qlkll0024m46xo6xolroj	5	1
149zdDSn3eTOv75YQYxjfgsnHnlupfmaB	cki7mhmqv1248qf6x5gmymowo	6	1
16lr8ZKtviospd6b6kVIU9f3D1a05B63B	cki7mhmqw1255qf6x0ppgctw0	7	1
182rELUmwURut-CeC11qHcszcFAY2D_ST	cki7mhe3b0290qf6xo03ey97y	8	1
18qJyFIbYp5zaAMYSey3mTBX0rP5oU4Af	cki7mhmqx1267qf6xqog00ob5	9	1
1APVGZ5PkuUZCiG-JjnmYW7WAeT1ZTU-Y	cki7mhmqw1258qf6x9htip4dm	10	1
1AWs3NNH3qsFNxd56Ye_ObNd-WPNxatS-	cki7mhmqw1256qf6xa2ykxz5s	11	1
1DtN0oFNULINnWtiHseZM4eAO49p19c6J	cki7mhmqu1236qf6xo0vo0k7s	12	1
1Et0Cfgg8NpLTZVvsTrPdRXbmKp1LzDwW	cki7mhmqu1230qf6xdetlbr0z	13	1
1H0gbNuGzQHcVjDzp3MwqOvw6Bn8rYI4x	cki7mhmqv1237qf6xoo919898	14	1
1Hv6St0BnqbH2F_cr873Sp7Q52C3zCbew	cki7mhmqx1264qf6xzd79zcc4	15	1
1I5sbUUC_7g3w6vzVC6HX-G2Sagrk1-iB	cki7mhmqv1245qf6xg33xr00d	16	1
1L3o8eUTPKfNzZfdhNvrUi1f19g7UcnW9	cki7mhmqw1259qf6xz35k0wl1	17	1
1LG6bHtdKKyItUxS0faunH4eNtthhqWQB	cki7mhmqw1260qf6x80oxt7gy	18	1
1LNjc6Ohed1Q3XVVm-pxHOvBNi316xotp	cki7mhe2y0137qf6x16co6g1k	19	1
1Onm_XDdnhGXFZjLpAmVdb2vuKPIHtAhS	cki7mhmqu1229qf6xfhb4u7g8	20	1
1PdEsb7MnOw3_HTlgpXLnscgWw2Ccbcp4	cki7mhe2q0057qf6x0f84pdh7	21	1
1QPz8-ioLnTfKESMWHPlczc9cCSELEw6Q	cki7mhmqw1251qf6x08rddtd6	22	1
1RjncogrUJgpG-yOQczS3Pf75l6tQNoET	cki7mhmqv1249qf6xge4lb5w3	23	1
1S44j2Ox1eb4RoF8flo8KOnBRrtwJMWoy	cki7mhmqu1234qf6xavne8rjr	24	1
1TFlZ2aWDrhZoU1i4LrIBIj4jND-hKNhE	cki7mhmqx1261qf6x50s8kstl	25	1
1W7ykhefibWyKgditd5c0i3VfV-pMD6HD	cki7mhmqu1231qf6xazbnrbde	26	1
1WdtrkQBX-U4rVBRHYuPlvCJWMpZjzYMq	cki7mhmqv1246qf6xvvmgsmnq	27	1
1XRnvDadU5dlI1iCHf0YmTZmqsTkrvTz1	cki7mhe300183qf6x7adlapp0	28	1
1YXD33PzneIweVjn_n1nrlGFy8FEcQHzJ	cki7mhmqx1266qf6x94p5h3t3	29	1
1Yha3rwEz7uO-6C9x00Cgq9zCtL5Gg7Qn	cki7mhmqv1240qf6xconca5co	30	1
1_VNyHKA546AaPpkWZi8co09kZrytTHIT	cki7mhmqw1257qf6xoepohuvl	31	1
1_nwFFN-BVU1H5xwu4rI627ojEJia71Eh	cki7mhmqw1253qf6xdmk0bbaq	32	1
1eK3usv4UnhWN7Tw2O83ks2_IsHEsfsOs	cki7mhmqu1235qf6x47telful	33	1
1gwTkJVODHlwVl0i2wyrFuh0j1TpbvjU9	cki7mhmqw1250qf6xaqhag1tk	34	1
1i7AMVK0gobe8IkYbBAb0OOE1QSsseZQl	cki7mhmqx1270qf6xnuut0k39	35	1
1iHlp26Ati6BA1d5OfW9bV8dXtw0_u7xK	cki7mhmqx1269qf6xpom2doqb	36	1
1kXvKA5340jMfcGUAo6mWUs_tDWn89L60	cki7mhmqv1241qf6xf72s1quk	37	1
1nvxottcQPgoAogl-KRFsD_B0Ul2ura4M	cki7mhe310204qf6xd15afeol	38	1
1p4zKemsqoVbcHWDP6tRt0uFpWCYXDxXk	cki7mhmqx1265qf6x3fbfjso9	39	1
1pWUJa5Ui235UBE8pC8Vsy7Rh9GNj_Ikm	cki7mhmqv1244qf6xmuwh1h82	40	1
1q51NLbQQD80s0ZPM0CIE8tY9XYMPXh6c	cki7mhmqx1268qf6xpcdok7pw	41	1
1q5XSJNbdyTX7HEq60vYbrjAXKAxwJhXI	cki7mhmqv1243qf6x6tiywft8	42	1
1rXlGb-F6EHQzCPOj4LbIsisrYWA7FCFP	cki7mhmqv1239qf6xvbg9l0xr	43	1
1rZpdrBu-dI8AfQzDNmGItgcmjJdXFq2N	cki7q0chv0001m46x77ptg0vf	44	1
1sKJul8vkgSVnGcg6bHmckBbRRgqYW0sg	cki7mhe2z0152qf6x0c6mz9y2	45	1
1tyoP0ml8Q0e7A-9RLCDSFJhqtsY5qTEL	cki7mhmqu1233qf6xn4p24r16	46	1
1uQyy6KC_lqDlSaKlSXuOIdQZ4M3EVvqM	cki7mhmqw1254qf6xy92gtqrk	47	1
1vNXmueb92le8ZiLNsUfV-GM_9zI_v5V4	cki7mhe2z0150qf6x07g7wwwb	48	1
1vWN_OwmaYxSr13ji_zKk88o9jC8frtnk	cki7mhmqv1238qf6xo42ize1k	49	1
1wCEV_zBSO6Hjh1SW_odTfPHTWGEvTJ9A	cki7mhmqx1262qf6x47gf8znb	50	1
1yDwE68FoElY5f_xx7AffmJED3P_pNElG	cki7mhmqx1263qf6x0p0tvj8r	51	1
1yn3BNykdwWAOX-wdd4JVisgaGhKwOCLP	cki7mhmqv1242qf6xm5icchhm	52	1
1z6icucZwQrOQ6_dnEGzEF5RTLUhk6EUi	cki7q0chv0002m46xo46cypfb	53	1
1zM94eJAqYwz-6ezl5LabpXxZ5zG9HBw3	cki7mhe2v0098qf6xizx98pnv	54	1
\.


--
-- Name: MemberBadge_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."MemberBadge_id_seq"', 54, true);


--
-- Name: MemberBadge MemberBadge_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MemberBadge"
    ADD CONSTRAINT "MemberBadge_pkey" PRIMARY KEY (id);


--
-- Name: Member Member_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."Member"
    ADD CONSTRAINT "Member_pkey" PRIMARY KEY (id);


--
-- Name: Member.email_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Member.email_unique" ON public."Member" USING btree (email);


--
-- Name: Member.phone_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "Member.phone_unique" ON public."Member" USING btree (phone);


--
-- Name: MemberBadge.imageDriveId_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "MemberBadge.imageDriveId_unique" ON public."MemberBadge" USING btree ("imageDriveId");


--
-- Name: MemberBadge_memberId_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX "MemberBadge_memberId_unique" ON public."MemberBadge" USING btree ("memberId");


--
-- Name: MemberBadge MemberBadge_memberId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."MemberBadge"
    ADD CONSTRAINT "MemberBadge_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES public."Member"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

