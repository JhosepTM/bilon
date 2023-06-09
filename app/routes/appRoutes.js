import express from "express";
import { registerSCO, getAllSCO, registerSCOAsset, registerCard, getSCO, deleteSCO, deleteCard, getAssetsIDs } from '../controllers/appController.js';

export const routerApp = express.Router();
//Ruta para registrar un SCO, necesita { title, instruction, historiaPrevia }
routerApp.post('/register/sco', registerSCO);
//Ruta para registrar un Assets al SCO, necesita { sco_id, asset_id }
routerApp.post('/register/SCOAsset', registerSCOAsset);
//Ruta para registrar un Card al SCO, necesita { sco_id, asset_id, title, track, posOrden, description }
routerApp.post('/register/card', registerCard);
//Ruta para obtener la lista de SCO cada uno con sus Cards, no necesita nada
routerApp.get('/get/all_sco', getAllSCO);
//Ruta para obtener un SCO con sus Cards, necesita { sco_id }
routerApp.get('/get/sco/:sco_id', getSCO);
//Ruta para eliminar un SCO con sus Cards, necesita { sco_id }
routerApp.delete('/delete/sco', deleteSCO);
//Ruta para eliminar un target de un SCO, necesita { card_id }
routerApp.delete('/delete/card', deleteCard);

routerApp.get('/get/assets_id', getAssetsIDs);
