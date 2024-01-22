import { useState } from "react";

function TodoList() {
    const [currentTask, setCurrentTask] = useState("");
    /*
    Van a currentTask-unk -> mivel tudunk értéket adni neki 
    a setCurrentTask-vel, amit meghívunk az input-ban 
                <input type="text"
                value={currentTask}
                className="center-input"
                onChange={(e) => setCurrentTask(e.target.value)} />
    */ 
    const [currentImportance, setCurrentImportance] = useState(0);
    /*
    és ugyanígy az importnance-nak is értéket kell adnunk (onChange) -> 
                <select value={currentImportance}
                className="center-input"
                onChange={(e => setCurrentImportance(parseInt(e.target.value)))}>

    az onChange egy eseménykezelő mint az eventListener és arra reagál ez az eseménykezelő, hogyha módosul ennek az értéke 
    tehát a kiválasztott érték , akkor beállítja setCurrentImportance-et 
    */
    const [tasks, setTasks] = useState([]);
    //akkor ha üres az input mezőnk vagy nem adtunk meg hozzá importance-t, akkor tudunk hibaüzeneteket adni, erre hozunk létre -> 
    const [errors, setErrors] = useState([]);

    /*
    értéke egy tömb és ugy fog felépülni ez a tömb, hogy tömbon belül létrehozunk objektumokat, 
    aminek két kulcsa van, az egyik az a task, másik az importance(aminek a kezdőértéke lehet 1,2,3, amiket megadtunk az option value-inak)
    -> 
    const [tasks, setTasks] = useState([{task:"", importance:1}])
    így majd, de alapból egy üres tömbel kezdődik
    -> 
    const [tasks, setTasks] = useState([]);
    */

    /*
    készítünk egy createTask nevű függvényt, amiben létrehozunk egy taskObj-et, aminek a kulcsai a task és importance 
    ezeknek az értékei, pedig a currentTask és currentImportance, amiket felül megadtunk a változóban 
    */
    createTask = () => {
        /*
        itt nézzük meg, hogy van-e error
        amennyiben a currentTask üres, tehát nem írtunk be semmit vagy nem választottunk ki fontosságot
        setErrors leírása angolul az errors.js-ben 
        */
        let errorExists = false;
        /*
        ha ezt a változót nem hoznánk létre, akkor nem kapnánk meg az error értékeit
        setErrors itt még nem fogjuk megkapni az errorsnak az értékét
        az errorExists változót hibák esetén false-ról atírjuk true-ra
        */

        setErrors([]);
        /*
        leürítjük az errorokat itt, mert ha több errort csinálnánk, akkor egymás alá írná többszörösen ugyanazt az error üzenetet
        de ha a createTask függvény elején beállítjuk az üres tömböt, akkor ebben az esetben már csak egyszer fogja kiírni
        */

        if (currentTask.length === 0) {
            setErrors(e => [...e, "A feladat leírása nem lehet üres!"]);
            errorExists = true;
        }

        if (currentImportance === 0) {
            setErrors(e => [...e, "Kötelező beállítani a fontosságot!"]);
            errorExists = true;
        }

        if (errorExists)
            return;
        /*
        Ha az errorExists true, akkor dobunk egy returnt, mert nem szeretnénk felvenni ezt a hibást valamit
        Még azt kell mecsinálni, hogy kiírjuk a hibát, hogyha volt itt -> 
        return(
        <div className="container center-text"> 
        */


        const taskOjb = {
            task: currentTask.trim(), //itt kell trim, mert ha itt lenne a trim -> setCurrentTask(e.target.value), akkor mindent egybe írna be 
            importance: currentImportance
        };

        //tasks-be belerakjuk az objektumokat, ilyan formában
        setTasks(t => [...t, taskOjb]);
        /*
        spread operator -> 
        kibontja az elemeit tömbnek, tehát, olyan mintha felsorolnánk az elemket 
        tehát mintha leírnánk az összes elemet és plusz még hozzáadjuk a taskObj-et -> példa hpgy müködik a spread operator 

        const arr = [1,2,3,4,5,6,7,8,9,10];
        const arr2 = [...arr];
        console.log(arr2); [1,2,3,4,5,6,7,8,9,10] ugyanazt fogjuk visszakapni ami az arr-ben volt 

        const arr2 = [...arr, 11] akkor visszakapjuk az arr plusz még hozzáadtuk a 11-et 
        erre való a spread operator, hogy visszakapjuk a tömböt egy másik változóban és ehhez még hozzá tudunk adni is az eredeti tömbhöz

        de még arra is jó -> 
        function spread(...elements) {
            console.log(elements);
        }

        spread(1,2,45,35,4545,6674) és itt bármennyi értéket meg tudunk neki adni, mert ott van a ... !!!!!!!!!!!!!!!!!!!!!!!
        teetszőleges számú paraméter létrehozását segíti elő 
        */
        /*
        [...t] -> ... spread operator, olyan mintha felsorolnánk, így -> [t[0], t[1]]
        olyan mintha vesszővel felsorolnánk, ahány eleme van a t-nek első, második stb., mint itt felül 

        !!!! és utána a taskObj, mint második elemet hozzátesszük ->
        így a task az őnmagával lesz egyenlő plusz még a taskObj-vel

        ezután adunk egy onClick-et a buttonünknek 
        ->
        !!!!!!!!!!
        <button onClick={createTask}>Teendő felvétele</button>
        ez azt jelenti, hogy amikor rákattintunk a Teendő felvitele gombra, akkor meg fogja 
        hívni a createTask függvényt és összeszedi a currentTask-et és a currentImportance-t egy objektumba
        és ezt elhelyezi a tasks nevű tömbben
        */

        console.log(taskOjb);
        /*
        az írjuk a terminálba, hogy npm start és akkor megjelenik a böngésző 
        de ez még nem fog megjelenni, mert az App.js -> oda kell behívni

        és ilyen formában importáljuk a TodoList-et

        ez most a böngészőben, ugy fog kinézni, hogy van egy Teendő elnevezése, alatta egy input mező, ahoba be tudunk írni
        utána van egy Fontosság, alatta egy select mező, amibe az van beleírva, hogy Válassz fontosságot alapból és ha lenyitjuk
        ott vannak a további optionok, hogy kicsit fontos stb. és mellette egy Teendő felvétele gomb és, hogy ezek egymás mellett
        legyenek csinálunk egy .center-input class-t és css-ben megadunk neki egy display:block-ot valamilyen margin-val
        -> 
        .center-input {
        display: block;
        margin: 15px auto; 
        } 

        és ezt a center-input class-t megadjuk itt a input, select és a buttonunknak is 
        és csinálunk még egy 
        .center-text {
        text-align: center;
        }
        amit hozzáadunk mindennek tehát az egész container-nek -> <div className="container center-text">

        és így már az összes mező és a szöveg egymás alatt van középen egy bizonyos margin-val 
        */

        /*
        és ha most beíruk valamit a Teendő elnevezéséhez, kiválasztunk neki egy importance-t és rányomunk a gombunkra 
        akkor a böngésző console-ján így fog megjelenni a taskObj-umunk-> 
        {task: 'sfdgdgdf', importance}
            importance: 2
            task: "sfdgdgdf"
            [[Prototype]]: Object

        és már be is raktuk a setTasks segítségével a Tasks-be -> setTasks(t=>[...t, taskOjb]);
        const [tasks, setTasks] = useState([]);
        */

        /*
        Ha most beírunk, felvesszünk egy task-et, akkor és rányomunk a Teendő felvétele gombra, akkor az a task amitt beírtunk az input mezőben 
        miután rányomunk, hogy felvétel eltünjön a szöveg onnan

            <h3>Teendő elnevezése</h3>
            <input type="text" 
            value={currentTask} 
            className="center-input"
            onChange={(e)=> setCurrentTask(e.target.value.trim())}/>

        és ezt ugy tudjuk megtenni, hogy mivel hozzákötöttük a value currentTask-et az input mezőhöz, tehát ez a value-ja,
        ezért a setCurrentTask(""); miatt ki fog ürülni az input mező
        setCurrentImportance(0); akkor meg az importance mező(select) visszaállni alapállapotába 
        */
        setCurrentTask("");
        setCurrentImportance(0);
    };

    /*
    Hogyan lesz a currentTask-nek és a currentImportance-nek értéke 
    -> 
            <h3>Teendő elnevezése</h3>
            <input type="text" value={currentTask}
            onChange={(e)=> setCurrentTask(e.target.value.trim())}/>

    Az (e) az az event objektum, a target az mindig az a mező, tag amiből inditottuk az eseménykezelőt (itt az input)
    a value az ennek a value-ja és a trim pedig azért szükséges, hogy a whitespace-ket leszedjük

    és itt még azt is mondhatjuk, hogy a value-ja az hozzá lesz kötve a currentTask-hoz -> value={currentTask}

    select mező onChange
    -> 
    <select value={currentImportance} onChange={(e=>setCurrentImportance(parseInt(e.target.value)))}>
    mivel ez egy szám, ezért kell a parseInt és ugyanugy beállítottuk a value-ját itt currentImportance-ra, mint 
    az elöbb a currentTaskra az input mezőnél 
    */

    const completeTask = (i) => {
        /*
        szükséges itt nekünk egy index, ami a listában van és ezt az index-et kitörölni
        */
        const t = [...tasks]; 
        /*
        ugy fogja érezni a változást, hogy egy teljesen új tömböt hozunk létre az eredetiből, ami nem ugyanarra a referenciára mutat, hanem csak
        ugyanazokat az elemeket tartalmazza, kivétel, amit le akarunk törölni és setTasks(t)-vel beállítjuk 
        */ 
        t.splice(i, 1);
        /*
        splice-val az indexedig elemtől töröljön egy darabot tehát saját magát azt ami azon az indexen található 
        splice még arra is jó, hogy elemeket rakjunk be de most itt ezt nem csináljuk 
        */
        /*
        visszamegyünk, ahol csináltunk a button-t -> onClick
        <button onClick={()=>completeTask(i)}
        completeTask-nek át kell adunk a task-nek az indexét, tehát az i-t, ami a tasks.map((t, i))-ből jön

        Itt azt történt, hogy ez a függvény vár egy indexet és a tasks.splice-val ezt az indexet kitöröljük, majd 
        ahol csináltuk a gombot, ott egy onChange-vel meghívjuk a completeTask-ot és átadjuk neki az indexet
        */
       setTasks(t);
       /*
       Miután slice-oltuk nem felejtjük el setTasks-elni, mert különben nem fogjuk viszontlátni az aktuális állapotban
       tehát miután kitöröltünk belüle valamit ezzel aktualizáljuk
       ...tasks-ból eltávolítottuk a t.splice-val egy elemet és ezt be kell állítani, hogy a tasks-ból eltünjön azaz elem
       */
    };

    return (
        <div className="container center-text">
            {
                errors.length !== 0 ? errors.map((e, i) => <h2 style={{ color: red }} key={i}>{e}</h2>) : ""
                /*
                ha az errors tömb nem üres, tehát a length-je nagyobb mint 0, akkor maps-val végigmegyünk az errorokon 
                és kiírjuk egy h2-ben jsx-ben, amit megadtunk az errors a setErrors-val -> setErrors(e=>[...e, "A feladat leírása nem lehet üres!"]);
                ha viszont nincsen semmi az errors-ban akkor egy üres string, tehát nem írunk ki semmit 

                key={i} kell -> mert ha egy map ciklusban szeretnénk létrehozni különböző jsx elemeket, kvázi html elemeket, akkor 
                mindegyiknek szükséges egy egyedi azonosító, ami a key property és az i az gyakorlatilag 0-tól az indexek, 
                tehát a tasks elemeinek az indexei és ez tökéletes nekünk erre a célra 
                */
            }

            <h3>Teendő elnevezése</h3>
            <input type="text"
                value={currentTask}
                className="center-input"
                onChange={(e) => setCurrentTask(e.target.value)} />

            <h3>Fontosság</h3>
            <select value={currentImportance}
                className="center-input"
                onChange={(e => setCurrentImportance(parseInt(e.target.value)))}>
                <option value="0">Válassz Fontosságot!</option>
                <option value="1">kicsit fontos</option>
                <option value="2">közepesen fontos</option>
                <option value="3">nagyon fontos</option>
            </select>

            <button onClick={currentTask}
                className="center-input"
            >Teendő felvétele</button>

            <ul className="tasks-ul">
                {
                    tasks.map((t, i) => {
                        let bgColor = "";

                        switch (t.importance) {
                            case 1:
                                bgColor: "lightblue";
                                break;
                            case 2:
                                bgColor: "orange";
                                break;
                            case 3:
                                bgColor: "crimson";
                                break;
                        }
                        return <li style={{ backgroundColor: bgColor }} key={i}>
                            {t.task}
                            <button onClick={()=>completeTask(i)}
                            className="small-input">Megoldottam</button>

                        </li>
                        /*
                        style={{backgroundColor:bgColor}} -> első kapcsoszárójel csak a változó behelytesítésére szolgál 
                        a belső pedig a style objektumunk {backgroundColor:bgColor}
                        */
                        /*
                        Csináltunk egy button-t az li-ben, hogyha megoldottuk már a feladatot, akkor a gomb rákattintásával eltünjön
                        és adtunk neki egy className="small-input"-ot a megformázás miatt css-ben 

                        ha erre a gombra rákattintunk, akkor el kell hogy tünjön az li erre csináljuk felül a completeTask függvényt 
                        */
                    })
                    /*
                    tasks-map-nak megadjuk a paraméterként a (t, i) a taskokat(amiket be fogunk írni az input mezőnkbe és az indexüket 
                    is fontos megadni, mert )
                    akkor t.task-ra meg fognak jelenni a task-ok, amiket beírtunk az input mezőbe, csak azt írja ki kell a konzol böngészőben
                    -> 
                    Each child in a list should have a unique key prop (task: 'asdfg', importance: 0)
                    ezt pedig, ugy lehet megoldanunk, hogy a az li-nek attributumként megadjuk -> key={i}
                    és akkor már nem ír hibaüzenetet, csak kijön a konzolon -> (task: 'asdfg', importance: 0)
                    azért nulla az importance, mert nem adtunk meg neki és a válasz fontosságot az az oprtion value="0"

                    key={i} -> mert ha egy map ciklusban szeretnénk létrehozni különböző jsx elemeket, kvázi html elemeket, akkor 
                    mindegyiknek szükséges egy egyedi azonosító, ami a key property és az i az gyakorlatilag 0-tól az indexek, 
                    tehát a tasks elemeinek az indexei és ez tökéletes nekünk erre a célra 

                    még azt megcsináljuk css-ben, hogy ez az ul kinézen valahogy, ezért adtunk neki egy className="tasks-ul" és
                    megformázzuk css-ben

                    azt szeretnénk megcsinálni, hogy ha beírunk valamit a task-ba attól függően, hogy milyen importance-t 
                    adunk meg neki, olyan background color-ja legyen (pl. importance 3 az piros lesz)
                    azért csináltuk meg, így return-vel, hogy tudjuk benne változót létrehozni ->
                    tasks.map((t, i)=>{
                        let bgColor = "";
                        return <li key={i}>{t.task}</li>

                    a switch-vel meghatároztunk 3 case-t (t.importance) mivel 3 importance-unk van és az elzőleg meghatározott let bgColor változóhoz 
                    mindegyik case-ben meghatározunk egy háttérszínt 

                    és amit visszaadunk a a returnben -> return <li style={{backgroundColor:bgColor}} key={i}>{t.task}</li>
                    az li-nek megadjuk attributumként style={{backgroundColor:bgColor}}
                    és így attól függően, hogy milyen importance-et határozunk meg, olyan színű lesz az li-nek a backgroundColor-ja 

                    azért szükséges a return, mert ha ez lenne -> 
                    tasks.map((t, i)=><li style={{backgroundColor:bgColor}} key={i}>{t.task}</li>
                    akkor nem lenne szükséges a return, mert zz maga lenne a visszatérési érték -> 
                    <li style={{backgroundColor:bgColor}} key={i}>{t.task}</li>
                    de így nem tudtunk volna létrehozni egy változót és nem tudtuk volna megcsinálnia switch-et 

                    ezért kellett 
                    tasks.map((t, i)=>{itt megcsináltuk ebben a kapcsoszárójelben a switch-et}
                    és ezért mivel itt egy kapcsoszárójelet írtunk azért kell a return is, hogy visszaadja ezt az li jsx elemet 
                    és meg is jelenjen 
                    */
                }
            </ul>
        </div>
    );
}

export default TodoList;

/*
Ha a Task tömbbe be vannak rakva objektumokként amiket beírtunk az input mezőbe egy adott importance-val, ilyen formában 
        {task: 'sfdgdgdf', importance}
        importance: 2
        task: "sfdgdgdf"
        [[Prototype]]: Object

    és a tasks-jeinket pedig megjelenítjük egy ul-ben a button-unk alatt 
*/

/*
    Ha csinálunk egy függvényt, akkor azt exportálni kell mindig react-ban -> app.js-be bele kell tenni, amit 
    csináltunk a függvény belsejében a return-ben

    Megformáztuk a App.css-ben a className="container" és a többi alapdolgot is pl. *, h1, h2.., input, button
*/

/*
    useState-s változót csináltunk, ahol egy tömbben kell megadni amit szeretnénk, 
    mindig két értéke van.
    Az egyik a neve, a második meg set + a neve és ezt tesszük egyenlővé -> useState();
    és akkor itt a useState zárójelében megadjuk, hogy mi legyen az értéke, itt egy üres string, de lehet akár pl. 0, vagy egy tömb

    és amikor elkészitünk egy useState-s váktozót, akkor megjelenik a legtetején -> import { useState } from "react";
*/
