const Metadata = require('../models/Metadata');
const SCO = require('../models/SCO')

const registerMetadata = async (req, res) => {
    try {
        const { formatArch } = req.body;

        const newMetadata = await Metadata.create(formatArch);

        res.status(200).json({message: 'Metadata Regsitrada', metadata: newMetadata});
    } catch (error) {
        res.status(500).json({error: 'Error al registrar Metadata xd'});
    }
};

const registerSCO = async (req, res) => {
    try {
        const { historiaPrevia, formatArch } = req.body;
        const newMetadata = await Metadata.create(formatArch);
        const metadata_id = newMetadata['id'];
        const newSCO = await SCO.create(historiaPrevia,metadata_id);

        res.status(200).json({message: 'SCO Regsitrado', SCO: newSCO});
    } catch (error) {
        res.status(500).json({error: 'Error al registrar SCO'});
    }
};

const getAllSCO = async (req, res) => {
    try {
        const listSCO = await SCO.getAll();
        if (listSCO) {
            res.status(200).json(listSCO);
        } else {
            res.status(200).json({message: 'Registros no encontrados'});
        }
    } catch (error) {
        res.status(500).json({error: 'Error al obtener el registro SCO'});
    }
};

module.exports = {
    registerMetadata,
    registerSCO,
    getAllSCO
};