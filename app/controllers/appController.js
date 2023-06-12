import { Card } from '../models/Card.js';
import { Metadata } from '../models/Metadata.js';
import { SCO } from '../models/SCO.js';
import { SCOAssets } from '../models/SCOAsssets.js';

export const registerMetadata = async (req, res) => {
    try {
        const { formatArch } = req.body;

        const newMetadata = await Metadata.create(formatArch);

        res.status(200).json({message: 'Metadata Regsitrada', metadata: newMetadata});
    } catch (error) {
        res.status(500).json({error: 'Error al registrar Metadata xd'});
    }
};

export const registerSCO = async (req, res) => {
    try {
        const { title, instruction, historiaPrevia } = req.body;
        const formatArch = "SCO";
        const newMetadata = await Metadata.create(formatArch);
        const metadata_id = newMetadata['id'];
        const newSCO = await SCO.create(title, instruction, historiaPrevia, metadata_id);

        res.status(200).json({message: 'SCO Regsitrado', SCO: newSCO});
    } catch (error) {
        res.status(500).json({error: 'Error al registrar SCO'});
    }
};

export const registerSCOAsset = async (req, res) => {
    try {
        const { sco_id, asset_id } = req.body;
        const newSCoAsset= await SCOAssets.create(sco_id, asset_id);

        res.status(200).json({message: 'SCOAsset Registrado', SCOAsset: newSCoAsset});
    } catch (error) {
        res.status(500).json({error: 'Error al registrar SCOAsset'});
    }
}

export const registerCard = async (req, res) => {
    try {
        const formatArch = "Card";
        const { sco_id, asset_id, title, track, posOrden, description } = req.body;
        const newMetadata = await Metadata.create(formatArch);
        const metadata_id = newMetadata['id'];
        const newCard= await Card.create(title, track, description, posOrden, metadata_id, sco_id, asset_id);

        res.status(200).json({message: 'Card Regsitrado', Card: newCard});
    } catch (error) {
        res.status(500).json({error: 'Error al registrar Card'});
    }
}

export const getAllSCO = async (req, res) => {
    try {
        const listSCO = await SCO.getAll();
        // const newList = listSCO.map(async (sco)=>{
        //     const sco_id = sco['id'];
        //     const cards = await Card.getAllByIdSCO(sco_id);
        //     return {
        //         ...sco,
        //         "cards": cards
        //     }
        // })
        const newList = [];
        for (const sco of listSCO) {
            const sco_id = sco['id'];
            const cards = await Card.getAllByIdSCO(sco_id);
            const res = {
                ...sco,
                "cards": cards
            }
            newList.push(res)
        }
        if (listSCO) {
            res.status(200).json(newList);
        } else {
            res.status(200).json({message: 'Registros no encontrados'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al obtener los registros SCO'});
    }
};

export const getSCO = async (req, res) => {
    try {
        const sco_id = req.params.sco_id;
        const sco = await SCO.getById(sco_id);
        const cards = await Card.getAllByIdSCO(sco_id);
        const resSCO = {
            ...sco,
            "cards": cards
        }    
        if (sco) {
            res.status(200).json(resSCO);
        } else {
            res.status(200).json({message: 'Registro no encontrado'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al obtener el registro SCO'});
    }
};

export const deleteSCO = async (req, res) => {
    try {
        const { sco_id } = req.body;
        const sco = await SCO.getById(sco_id);
        const cards = await Card.getAllByIdSCO(sco_id);
        const metadata_ids = [];
        for (const card of cards) {
            const card_id = card['id'];
            metadata_ids.push(card['metadata_id']);
            Card.deleteById(card_id);
        }  
        metadata_ids.forEach(metadata_id => {
            Metadata.deleteById(metadata_id);
        });
        SCO.deleteById(sco_id);
        Metadata.deleteById(sco['metadata_id']);

        res.status(200).json({message: 'SCO eliminado, junto con todas sus card'});
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar el SCO con sus card'});
    }
};

export const deleteCard = async (req, res) => {
    try {
        const { card_id } = req.body;
        const card = Card.getById(card_id);
        const metadata_id = card['metadata_id'];
        Card.deleteById(card_id);
        Metadata.deleteById(metadata_id);

        res.status(200).json({message: 'Card elimada'});
    } catch (error) {
        res.status(500).json({error: 'Error al eliminar la card'});
    }
};


