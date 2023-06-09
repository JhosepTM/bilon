import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';
import archiver from 'archiver';
import path, {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
/**
 * card:
 *  titulo: string
 *  descripcion: string
 *  pista: string
 *  path: string
 * **/
const cardsHtml = (cards) => {
    let html = '<div class="card-container">';
    cards.forEach(card => {
        html += `
            <div class="card">
                <span class="arrow arrow-left"></span>
                <h2>${card.titulo}</h2>
                <p>${card.descripcion}</p>
                <img src="${'src/'+card.path}" alt="Imagen Tarjeta 1">
                <p class="hint" ${card.pista}</p>
                <span class="arrow arrow-right"></span>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

const html = (props, cards) => {
    let titulo = props.titulo;
    let instruccion = props.instruccion;
    let historia = props.historia;
    let tarjetas = cards;
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Aplicacion de Historias</title>
            <link rel="stylesheet" href="styles.css">
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <script src="script.js"></script>
            <script src="scormfunctions.js"></script>
        <body>
            <div class="container">
                <h1>${titulo}</h1>
                <p>Instruccion: ${instruccion}</p>
                <p>Historia Previa: ${historia}</p>
            </div>
        
            ${cardsHtml(tarjetas)}
            <div id="submit-button">
                <button onclick="imprimirOrdenTarjetas()">Enviar</button>
            </div>
            <div id="myModal" class="modal">
                <div class="modal-content">
                    <span class="close">&times;</span>
                    <p id="modal-text"></p>
                </div>
            </div>    
        </body>
    </html>
    `;
}

const xml = (curso) => {
    return `
        <?xml version="1.0" encoding="UTF-8"?>
        <!--Generated by LearningCart www.LearningCart.com -->
        <manifest identifier="CourseID" version="1.2"
                    xmlns="http://www.imsproject.org/xsd/imscp_rootv1p1p2"
                    xmlns:adlcp="http://www.adlnet.org/xsd/adlcp_rootv1p2"
                    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                    xsi:schemaLocation="http://www.imsproject.org/xsd/imscp_rootv1p1p2 imscp_rootv1p1p2.xsd
                                        http://www.imsglobal.org/xsd/imsmd_rootv1p2p1 imsmd_rootv1p2p1.xsd
                                        http://www.adlnet.org/xsd/adlcp_rootv1p2 adlcp_rootv1p2.xsd" >
        
            <organizations default="CourseID-org">
            <organization identifier="CourseID-org">
                <title>${curso}</title>
                <item identifier="I_LC001" identifierref="LC001">
                <title>${curso}</title>
                </item>
                <metadata>
                <schema>ADL SCORM</schema>
                <schemaversion>1.2</schemaversion>
                </metadata>
            </organization>
            </organizations>
        
                <resources>
                    <resource identifier="LC001" type="webcontent" adlcp:scormtype="sco" href="page.html">
                        <file href="page.html" />
                    </resource>
                </resources>
        
        </manifest>
    `;
}

const css = () => {
    return `
        /* styles.css */
        body {
            font-family: Arial, sans-serif;
            background-color: #f2f2f2;
            margin: 0;
            padding: 0;
        }
        
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
        }
        
        h1 {
            color: #333333;
            font-size: 24px;
            margin-bottom: 10px;
        }
        
        p {
            color: #666666;
            font-size: 18px;
            margin-bottom: 20px;
        }
        
        .card-container {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }
        
        .card {
            background-color: #ffffff;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin: 10px;
            width: 200px;
            text-align: center;
        }
        
        .card h2 {
            font-size: 20px;
            margin-bottom: 10px;
        }
        
        .card p {
            font-size: 16px;
        }
        
        .card img {
            max-width: 100%;
            height: auto;
            margin-top: 10px;
            border-radius: 4px;
        }
        .card .arrow {
            display: inline-block;
            width: 20px;
            height: 20px;
            background-color: #333333;
            color: #ffffff;
            text-align: center;
            line-height: 20px;
            font-size: 14px;
            cursor: pointer;
        }
        
        .card .arrow-left:before {
            content: "<";
        }
        
        .card .arrow-right:before {
            content: ">";
        }
        #submit-button {
            text-align: center;
        }
        
        #submit-button button {
            background-color: #8CCB9B;
            color: #ffffff;
            padding: 10px 20px;
            border: none;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }
        
        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background-color: rgba(0, 0, 0, 0.4);
        }
        
        .modal-content {
            background-color: #fefefe;
            margin: 15% auto;
            padding: 20px;
            border: 1px solid #888;
            width: 80%;
            max-width: 400px;
            text-align: justify;
        }
        
        .modal-content p {
            text-aling: justify;
        }
        
        .close {
            color: #aaa;
            float: right;
            font-size: 28px;
            font-weight: bold;
            cursor: pointer;
        }
        
        .close:hover,
        .close:focus {
            color: #000;
            text-decoration: none;
            cursor: pointer;
        }
        
        .number-red{
            color:red;
        }
        
        .number-green{
            color:green;
        }
    `;
}

export const js = (ordenCorrecto) => {
    return `
        $(document).ready(function() {
            $(".arrow-left").click(function() {
                var card = $(this).parent();
                card.insertBefore(card.prev());
            });
        
            $(".arrow-right").click(function() {
                var card = $(this).parent();
                card.insertAfter(card.next());
            });
            $(".card").on("contextmenu", function(e) {
                e.preventDefault();
        
                var hint = $(this).find(".hint");
        
                if (hint.is(":hidden")) {
                    hint.show();
                } else {
                    hint.hide();
                }
            });
        });
        function imprimirOrdenTarjetas() {
            var tarjetas = $(".card");
            var orden = [];
        
            tarjetas.each(function(index) {
                var titulo = $(this).find("h2").text();
                orden.push(titulo);
            });
        
            ordenOff = ${ordenCorrecto};
        
            let res = orden.join(",").split(',');
            let n = ordenOff.length;
            let cont = 0;
            let fallas = []
            let buenas = []
            for(let i = 0; i<n; i++){
                let aux1 = ordenOff[i];
                let aux2 = orden[i];
                if(aux1 === aux2){
                    cont++;
                    buenas.push(aux2); 
                }else{
                    fallas.push(aux2);
                }
            }
        
            var score = ((cont/n)*100.0).toFixed(2);
        
            console.log(score);
        
            ScormProcessSetValue("cmi.core.score.raw", score);
            ScormProcessSetValue("cmi.core.score.min", "0");
            ScormProcessSetValue("cmi.core.score.max", "100");
            if (score >= 70){
                ScormProcessSetValue("cmi.core.lesson_status", "passed");
            }
            else{
                ScormProcessSetValue("cmi.core.lesson_status", "failed");
            }
            
            var modal = $("#myModal");
            var modalText = $("#modal-text");
        
            let textFail = fallas.length == 0 ? "Ninguna" : ("<br>"+fallas);
            let classNumber = score >= 70 ? 'number-green' : 'number-red';
            modalText.html("Orden de las tarjetas:<br>" + orden.join(", ")+"<br><br>Orden real:<br>"+ordenOff+"<br><br>Fallas: "+textFail+"<br><br>Puntaje: <span class='"+classNumber+"'>"+score+"%</span>");
            modal.show();
        }
        
        $(document).ready(function() {
            $(".close").click(function() {
                $("#myModal").hide();
                console.log("Exit");
                ScormProcessSetValue("cmi.core.exit", "");
                ScormProcessFinish();
            });
        });
    `; 
}

const shuffle = (array) => {
    array = array.concat();
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
  
    return array;
}
 
export const genScorm = async (req, res, next) => {
    let ordenCorrecto = req.body.cards;
    let ordenMezcla = shuffle(ordenCorrecto);
    let titulosCorrecto = "["+ordenCorrecto.map((item) => '"'+item.titulo+'"')+"]";
    
    let htmlF = html(req.body, ordenMezcla);
    let jsF = js(titulosCorrecto);
    let cssF = css();
    let xmlF = xml(req.body.titulo);

    let flag = true;

    let paths = req.body.cards.map((item) => item.path);
    console.log(paths);
    let temp = req.body.titulo.replace(/ /g, "_") +"_"+(new Date()).getTime();

    try {
        fs.mkdirSync('app/temp/'+temp);

        fs.mkdirSync('app/temp/'+temp+'/src');
        for(let i = 0; i<paths.length; i++){
            fs.copyFileSync(`app/uploads/${paths[i]}`, `app/temp/${temp}/src/${paths[i]}`);
        }

        fs.writeFileSync(`app/temp/${temp}/page.html`, htmlF);

        fs.writeFileSync(`app/temp/${temp}/imsmanifest.xml`, xmlF);

        fs.writeFileSync(`app/temp/${temp}/script.js`, jsF);

        fs.writeFileSync(`app/temp/${temp}/styles.css`, cssF)

        const pathScrom = path.join(__dirname, '../temp/scormfunctions.js');

        fs.copyFileSync(pathScrom, `app/temp/${temp}/scormfunctions.js`);

        const output = fs.createWriteStream(`app/temp/${temp}.zip`);
        const archive = archiver('zip', {
            zlib: { level: 9 }
        });

        output.on('close', () => {
            console.log("carpeta comprimida correctamente");
            res.download(`app/temp/${temp}.zip`, `${temp}.zip`, (err) => {
                if(err){
                    console.log(err);
                    fs.rmdirSync(`app/temp/${temp}`, { recursive: true });
                    res.status(500).json({error:'Error al empaquetar archivo'});
                    return;
                }else{

                    fs.unlinkSync(`app/temp/${temp}.zip`);
                    fs.rmdirSync(`app/temp/${temp}`, { recursive: true });
                }
            });
        });
        archive.pipe(output);
        archive.directory(`app/temp/${temp}`, false);
        archive.finalize();
    }catch(err){
        console.log(err);
        fs.rmdirSync(`app/temp/${temp}`, { recursive: true });
        if(err.code === 'ENOENT'){
            res.status(500).json({error:'Error en ruta de asset'});
        }else{
            res.status(500).json({error:'Error al generar scorm'});
        }
        return;
    }
}