import * as THREE from 'three';
import { GLTFLoader }    from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader }   from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Reflector }     from 'three/addons/objects/Reflector.js';

const CONFIG = {
  waypoints: [
    // EXTERIÉR  (budova.glb)
    {
      name: 'Exteriér',
      desc: 'Vonkajší pohľad na budovu',
      model: 'budova.glb',
      cam: { x: -34.39, y: 5.93, z: 20.03 },  tgt: { x: -4.87, y: -2.83, z: 2.23 },
    },
    // -- Orby --
    { name: 'Vstupná hala',     model: 'budova.glb', targetModel: 'Vchod.glb',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
      orbPos: { x: -7.75, y: -5.5, z: 7 }, hideFromNav: true },
    { name: 'Ubytovacia chodba', model: 'budova.glb', targetModel: 'Ubytovanie.glb',
      cam: { x: 8.52, y: -1.48, z: -0.38 }, tgt: { x: 8.42, y: -1.48, z: -0.38 },
      orbPos: { x: 12, y: -4.5, z: -12.2 }, hideFromNav: true },
    { name: 'Centrum',          model: 'budova.glb', targetModel: 'Centrum.glb',
      cam: { x: 14.77, y: -0.05, z: -0.78 },  tgt: { x: 13.78, y: -0.14, z: -0.75 },
      orbPos: { x: 15.7, y: -5.46, z: 9.25 }, hideFromNav: true },
    { name: 'Sála 2',           model: 'budova.glb', targetModel: 'Sala2.glb',
      cam: { x: -0.26, y: 0.68, z: 0.32 },  tgt: { x: -0.23, y: 0.54, z: -0.67 },
      orbPos: { x: 15.7, y: -5.46, z: -0.99 }, hideFromNav: true },

    // Vstupná Hala (Vchod.glb)
    {
      name: 'Vstupná hala',model: 'Vchod.glb',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
      orbPos: null,
    },
    // -- Orby --
    {
      name: 'Centrum',  model: 'Vchod.glb',  targetModel: 'Centrum.glb',
      cam: { x: -0.55, y: -0.03, z: -0.22 },   tgt: { x: 0.21, y: -0.12, z: 0.42 },
      orbPos: { x: 1.10, y: -0.65, z: 6.05 },  hideFromNav: true,
    },
    {
      name:   'Sala 1',  model: 'Vchod.glb',   targetModel: 'Sala1.glb',
      cam: { x: -0.03, y: -0.53, z: -0.30 },     tgt: { x: -0.03, y: -0.54, z: -0.20 },
      orbPos: { x: 5.5,   y: -0.65, z: -0.75 },  hideFromNav: true,
    },
    {
      name:   'Sala 2',   model: 'Vchod.glb',  targetModel: 'Sala2.glb',
      cam: { x: -0.26, y: 0.68, z: 0.32 },       tgt: { x: -0.23, y: 0.54, z: -0.67 },
      orbPos: { x: 5.5,  y: -0.65, z: -3.5 },  hideFromNav: true,
    },
    {
      name: 'Chodba k Ubytovaniu',  model: 'Vchod.glb', targetModel: 'Ubytovanie.glb',
      cam: { x: 0.38, y: -2.12, z: 5.45 },  tgt: { x: 0.37, y: -2.04, z: 4.45 },
      orbPos: { x: 5, y: -0.65, z: -6.5}, hideFromNav: true,
    },
    { name: '2. poschodie', model: 'Vchod.glb',
      cam: { x: -2.11, y: 3.58, z: 2.01 },   tgt: { x: -1.11, y: 3.47, z: 2.04 },
      orbPos: { x: -4, y: -0.65, z: 1.10 },  hideFromNav: true
    },
    { name: '1. poschodie', model: 'Vchod.glb',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
      orbPos: { x: -3.14, y: 3.0, z: 2.91},  hideFromNav: true
    },
    { name: '2. poschodie', model: 'Vchod.glb',
      cam: { x: -2.09, y: 3.58, z: 2.01 },    tgt: { x: -2.10, y: 3.58, z: 2.01 },
      orbPos: { x: -2.8, y: 6.5, z: 2.91  },  hideFromNav: true

    },
    { name: '3. poschodie', model: 'Vchod.glb',
      cam: { x: -1.83, y: 7.06, z: 1.34 },   tgt: { x: -2.53, y: 6.98, z: 0.62 },
      orbPos: { x: -3.21, y: 3, z: 1.18 },  hideFromNav: true
    },
    { model: 'Vchod.glb',
      cam: { x: -2.58, y: 7.16, z: -3.69 }, tgt: null,
      orbPos: { x: -2.58, y: 6.8, z: -3.69  },
      hideFromNav: true , hideLabel: true
    },
    { model: 'Vchod.glb',
      cam: { x: -12.17, y: 7.10, z: -4.13 },      tgt: { x: -12.15, y: 7.05, z: -5.13 },
      orbPos: { x: -12.17, y: 6.8, z: -4.13 },
      hideFromNav: true , hideLabel: true
    },
    { model: 'Vchod.glb',
      cam: { x: -1.83, y: 7.06, z: 1.34 },   tgt: null,
      orbPos: { x: -1.83, y: 6.8, z: 1.34 },
      hideFromNav: true , hideLabel: true
    },
    {
      name: 'Počítačová učebňa',  model: 'Vchod.glb', targetModel: 'Infmiestnosť.glb',
      cam: { x: -0.68, y: -0.13, z: 1.67 },   tgt: { x: -0.74, y: -0.20, z: 2.67 },
      orbPos: { x: -1.25, y: 6.8, z: 3.28 }, hideFromNav: true,
    },
    {
      name: 'Učebna 1',  model: 'Vchod.glb', targetModel: 'UC1.glb',
      cam: { x: -2.69, y: -0.41, z: -0.39 },   tgt: { x: -1.70, y: -0.54, z: -0.42 },
      orbPos: { x: -11, y: 6.8, z: -5.17 }, hideFromNav: true,
    },
    {
      name: 'Učebna 2',  model: 'Vchod.glb', targetModel: 'UC2.glb',
      cam: { x: -1.45, y: -0.53, z: -0.27 },    tgt: { x: -0.46, y: -0.60, z: -0.44 },
      orbPos: { x: -13.53, y: 6.8, z: -5.17  }, hideFromNav: true,
    },
    {
      name: 'Tanečná sála',  model: 'Vchod.glb', targetModel: 'Tanecna.glb',
      cam: { x: -0.21, y: -0.40, z: 1.83 }, tgt: { x: 0.79, y: -0.41, z: 1.83 },
      orbPos: { x: -0.55, y: 3.25, z: 1.95  }, hideFromNav: true,
    },

    //Centrum (Centrum.glb)
    {
      name: 'Centrum',  desc: 'Študentské centrum', model: 'Centrum.glb',
      cam: { x: -0.55, y: -0.03, z: -0.22 },   tgt: { x: 0.21, y: -0.12, z: 0.42 },
    },
    //Orby
    {
      name: 'Vstupná hala',  model: 'Centrum.glb',  targetModel: 'Vchod.glb',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
      orbPos: { x: -0.5, y: -0.5, z: -1.5   }, hideFromNav: true,
    },
    {
      model: 'Centrum.glb',
      cam: { x: -0.55, y: -0.03, z: -0.22 },  tgt: { x: -0.54, y: -0.03, z: -0.21 },
      orbPos: { x: -0.55, y: -0.5, z: -0.22 },
      hideFromNav: true, hideLabel: true
    },
    {
      model: 'Centrum.glb',
      cam: { x: -0.29, y: -0.05, z: 5.16 }, tgt: { x: 0.47, y: -0.15, z: 5.79 },
      orbPos: { x: -0.29, y: -0.5, z: 5.16 },
      hideFromNav: true, hideLabel: true
    },
    {
      model: 'Centrum.glb',
      cam: { x: 3.70, y: -0.11, z: 5.34 },  tgt: { x: 4.68, y: -0.21, z: 5.47 },
      orbPos: { x: 3.70, y: -0.5, z: 5.34 },
      hideFromNav: true, hideLabel: true
    },
    {
      model: 'Centrum.glb',
      cam: { x: 9.14, y: -0.12, z: -0.77 }, tgt: { x: 10.13, y: -0.22, z: -0.78 },
      orbPos: { x: 9.14, y: -0.5, z: -0.77 },
      hideFromNav: true, hideLabel: true
    },
    {
      name: 'Sala 1',  model: 'Centrum.glb',  targetModel: 'Sala1.glb',
      cam: { x: -0.03, y: -0.53, z: -0.30 },     tgt: { x: -0.03, y: -0.54, z: -0.20 },
      orbPos: { x: 4.89, y: -0.5, z: -1.7 }, hideFromNav: true,
    },
    {
      name: 'Sala 1',  model: 'Centrum.glb',  targetModel: 'Sala1.glb',
      cam: { x: -0.03, y: -0.53, z: -0.30 },     tgt: { x: -0.03, y: -0.54, z: -0.20 },
      orbPos: { x: 15.23, y: -0.5, z: -1.7 }, hideFromNav: true,
    },
    {
      name: 'Exit',  model: 'Centrum.glb',  targetModel: 'budova.glb',
      cam: { x: -34.39, y: 5.93, z: 20.03 },  tgt: { x: -4.87, y: -2.83, z: 2.23 },
      orbPos: { x: 15.50, y: -0.5, z: -0.82 }, hideFromNav: true,
    },

    // Ubytovanie (Ubytovanie.glb)
    {
      name: 'Ubytovanie', model: 'Ubytovanie.glb',
      cam: { x: 0.38, y: -0.28, z: -0.11 },  tgt: { x: 0.93, y: -0.44, z: -0.22 },
    },
    // --Orby--
    {
      model: 'Ubytovanie.glb',
      cam: { x: 0.38, y: -2.49, z: 5.46 },  tgt: null,
      orbPos: { x: 0.38, y: -2.5, z: 5.45 },
      hideFromNav: true,    hideLabel: true,
    },
    {
      model: 'Ubytovanie.glb',
      cam: { x: 0.38, y: -0.28, z: -0.11 },  tgt: null,
      orbPos: { x: 0.38, y: -0.28, z: -0.11 },
      hideFromNav: true,    hideLabel: true,
    },
    {
      model: 'Ubytovanie.glb',
      cam: { x: 6.24, y: -1.42, z: -0.43 }, tgt:null,
      orbPos: { x: 6.24, y: -1.42, z: -0.43 },
      hideFromNav: true,    hideLabel: true,
    },
    {
      name: 'Tanečná sála',  model: 'Ubytovanie.glb',  targetModel: 'Tanecna.glb',
      cam: { x: -0.21, y: -0.40, z: 1.83 }, tgt: { x: 0.79, y: -0.41, z: 1.83 },
      orbPos: { x: -0.80, y: -0.50, z: 1.63 }, hideFromNav: true,
    },
    {
      name: 'Vstupná hala',  model: 'Ubytovanie.glb',  targetModel: 'Vchod.glb',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
      orbPos: { x: 0.31, y: -2.5, z: 6.37 }, hideFromNav: true,
    },
    {
      name: 'Exit',  model: 'Ubytovanie.glb',  targetModel: 'budova.glb',
      cam: { x: -34.39, y: 5.0, z: 20.03 },  tgt: { x: -4.87, y: -2.83, z: 2.23 },
      orbPos: { x: 8.32, y: -1.75, z: -0.36 }, hideFromNav: true,
    },

    //Sala 1 (Sala1.glb)
    {
      name: 'Sála 1',
      desc: 'Prvá sála',
      model: 'Sala1.glb',
      cam:    null,
      tgt:    null,
      orbPos: null,
    },
    // --Orby--
    {
      name: 'Vstupná hala',  model: 'Sala1.glb',  targetModel: 'Vchod.glb',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
      orbPos: { x: -5.25, y: -1.25, z: -3.25 }, hideFromNav: true,
    },
    {
      name: 'Centrum',  model: 'Sala1.glb',  targetModel: 'Centrum.glb',
      cam: { x: -0.55, y: -0.03, z: -0.22 },  tgt: { x: -0.54, y: -0.03, z: -0.21 },
      orbPos: { x: -5.25, y: -1.25, z: 3.8 }, hideFromNav: true,
    },
    {
      name: 'Centrum',  model: 'Sala1.glb',  targetModel: 'Centrum.glb',
      cam: { x: -0.55, y: -0.03, z: -0.22 },  tgt: { x: -0.54, y: -0.03, z: -0.21 },
      orbPos: { x: 5.0, y: -1.25, z: 3.80 }, hideFromNav: true,
    },

    //Sala 2 (Sala2.glb)
    {
      name: 'Sála 2', desc: 'Druhá sála', model: 'Sala2.glb',
      cam: { x: -0.26, y: 0.68, z: 0.32 },  tgt: { x: -0.23, y: 0.54, z: -0.67 },
    },
    // --Orby--
    {
      name: 'Vstupná hala',  model: 'Sala2.glb',  targetModel: 'Vchod.glb',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
      orbPos: { x: -5.80, y: -0.7, z: 3 }, hideFromNav: true,
    },
    {
      name: 'Exit',  model: 'Sala2.glb',  targetModel: 'budova.glb',
      cam: { x: -34.39, y: 5.93, z: 20.03 },  tgt: { x: -4.87, y: -2.83, z: 2.23 },
      orbPos: { x: 5.5, y: -0.7, z: 4 }, hideFromNav: true,
    },

    //Tanečná sála (Tanecna.glb)
    {
      name: 'Tanečná miestnosť', model: 'Tanecna.glb',
      cam: { x: -0.21, y: -0.40, z: 1.83 }, tgt: { x: 0.79, y: -0.41, z: 1.83 },
    },
    // --Orby--
     {
      model: 'Tanecna.glb',
      cam: { x: -0.21, y: -0.40, z: 1.83 },  tgt: null,
      orbPos: { x: -0.21, y: -0.7, z: 1.83 }, 
      hideFromNav: true, hideLabel: true
    },
     {
      model: 'Tanecna.glb',
      cam: { x: -0.33, y: -0.30, z: -3.98 },  tgt: null,
      orbPos: { x: -0.33, y: -0.7, z: -3.98  }, 
      hideFromNav: true, hideLabel: true
    },
    {
      name: 'Poschodie',  model: 'Tanecna.glb',  targetModel: 'Vchod.glb',
      cam: { x: -2.11, y: 3.58, z: 2.01 },   tgt: { x: -1.11, y: 3.47, z: 2.04 },
      orbPos: { x: -2.8, y: -0.7, z: 1.89  }, hideFromNav: true,
    },
    {
      name: 'Spoločenská miestnosť',  model: 'Tanecna.glb',  targetModel: 'Spolocenska.glb',
      cam: { x: -0.12, y: 0, z: 0.23 },    tgt: { x: -1.12, y: 0, z: 0.24 },
      orbPos: { x: -1.29, y: -0.7, z: 8.10  }, hideFromNav: true,
    },
    {
      name: 'Kapela miestnosť',  model: 'Tanecna.glb',  targetModel: 'Kapela.glb',
      cam: { x: 0.39, y: -0.28, z: -0.12 },  tgt: { x: 0.39, y: -0.28, z: -0.11 },
      orbPos: { x: -2.7, y: -0.7, z: -3.61  }, hideFromNav: true,
    },
    {
      name: 'Chodba k ubytovni',  model: 'Tanecna.glb',  targetModel: 'Ubytovanie.glb',
      cam: { x: 0.38, y: -0.28, z: -0.11 },  tgt: { x: 0.93, y: -0.44, z: -0.22 },
      orbPos: { x: 2.16, y: -0.7, z: -6.25  }, hideFromNav: true,
    },
    {
      name: 'Predsieň',  model: 'Tanecna.glb',  targetModel: 'Chodba.glb',
      cam: { x: -2.13, y: -0.21, z: -0.16 },    tgt: { x: -1.21, y: -0.53, z: 0.09 },
      orbPos: {  x: 2.7, y: -0.7, z: 7.91   },  hideFromNav: true,
    },

    // Spoločenská miestnosť (Spolocenska.glb)
    {
      name: 'Spoločenská miestnosť',       model: 'Spolocenska.glb',
      cam: { x: -0.12, y: 0, z: 0.23 },    tgt: { x: -1.12, y: 0, z: 0.24 },
    },
    // --Orby--
    {
      name: 'Tanečná miestnosť',  model: 'Spolocenska.glb',  targetModel: 'Tanecna.glb',
      cam: { x: -0.21, y: -0.40, z: 1.83 }, tgt: { x: 0.79, y: -0.41, z: 1.83 },
      orbPos: { x: 2.70, y: -0.55, z: -1.03  }, hideFromNav: true,
    },

    // Kapela miestnosť (Kapela.glb)
    {
      name: 'Miestnosť pre kapelu',
      desc: 'Miestnosť pre kapelu',
      model: 'Kapela.glb',
      cam: { x: 0.39, y: -0.28, z: -0.12 },  tgt: { x: 0.39, y: -0.28, z: -0.11 },
      orbPos: null,
    },
    // --Orby--
    {
      name: 'Tanečná miestnosť',  model: 'Kapela.glb',  targetModel: 'Tanecna.glb',
      cam: { x: -0.21, y: -0.40, z: 1.83 }, tgt: { x: 0.79, y: -0.41, z: 1.83 },
      orbPos: { x: 2.5, y: -0.7, z: -0.81  }, hideFromNav: true,
    },

    // Predsieň (Chodba.glb)
    {
      name: 'Malá chodba',  model: 'Chodba.glb',
      cam: { x: -2.13, y: -0.21, z: -0.16 },    tgt: { x: -1.21, y: -0.53, z: 0.09 },
    },
    // --Orby--
    {
      name: 'Tanečná miestnosť',  model: 'Chodba.glb',  targetModel: 'Tanecna.glb',
      cam: { x: -0.21, y: -0.40, z: 1.83 }, tgt: { x: 0.79, y: -0.41, z: 1.83 },
      orbPos: { x: -3.2, y: -0.30, z: 0.07  }, hideFromNav: true,
    },
    {
      name: 'Nácviková miestnosť',  model: 'Chodba.glb',  targetModel: 'Sklad.glb',
      cam: { x: -0.04, y: -0.62, z: -0.25 },  tgt: { x: -0.90, y: -0.80, z: 0.23 },
      orbPos: { x: -0.65, y: -0.8, z: 0.65  }, hideFromNav: true,
    },
    {
      name: 'Šatňa',  model: 'Chodba.glb',  targetModel: 'Satna.glb',
     cam: { x: -1.76, y: -0.47, z: 0.13 },  tgt: { x: -0.79, y: -0.69, z: 0.20 },
      orbPos: { x: 2.7, y: -0.8, z: -0.08  }, hideFromNav: true,
    },

    // Nácviková miestnosť (Sklad.glb)
    {
      name: 'Nácviková miestnosť',  model: 'Sklad.glb',
      cam: { x: -0.04, y: -0.62, z: -0.25 },  tgt: { x: -0.90, y: -0.80, z: 0.23 },
    },
    // --Orby--
    {
      name: 'Predsieň',  model: 'Sklad.glb',  targetModel: 'Chodba.glb',
      cam: { x: -2.13, y: -0.21, z: -0.16 },    tgt: { x: -1.21, y: -0.53, z: 0.09 },
      orbPos: { x: -0.65, y: -0.9, z: -1.8 }, hideFromNav: true,
    },

    //  Šatňa (Satna.glb)
    {
      name: 'Šatňa',  model: 'Satna.glb',
      cam: { x: -1.76, y: -0.47, z: 0.13 },  tgt: { x: -0.79, y: -0.69, z: 0.20 },
    },
    // --Orby--
    {
      name: 'Predsieň',  model: 'Satna.glb',  targetModel: 'Chodba.glb',
      cam: { x: -2.13, y: -0.21, z: -0.16 },    tgt: { x: -1.21, y: -0.53, z: 0.09 },
      orbPos: { x: -2.25, y: -0.9, z: -2.02  }, hideFromNav: true,
    },

    // Učebňa Informatiky (Infmiestnosť.glb)
    {
      name: 'Počítačová učebňa',   model: 'Infmiestnosť.glb',
      cam: { x: -0.68, y: -0.13, z: 1.67 },   tgt: { x: -0.74, y: -0.20, z: 2.67 },
    },
    // --Orby--
    {
      name: 'Chodba 3 poschodie',  model: 'Infmiestnosť.glb',  targetModel: 'Vchod.glb',
      cam: { x: -1.83, y: 7.06, z: 1.34 },   tgt: { x: -2.53, y: 6.98, z: 0.62 },
      orbPos: { x: -0.85, y: -0.5, z: -1   }, hideFromNav: true,
    },

    // Učebňa 1 (UC1.glb)
    {
      name: 'Učebňa 1',model: 'UC1.glb',
      cam: { x: -2.69, y: -0.41, z: -0.39 },   tgt: { x: -1.70, y: -0.54, z: -0.42 },
    },
    // --Orby--
    {
      name: 'Chodba 3 poschodie',  model: 'UC1.glb',  targetModel: 'Vchod.glb',
      cam: { x: -12.17, y: 7.10, z: -4.13 },      tgt: { x: -12.15, y: 7.05, z: -5.13 },
      orbPos: { x: -1.96, y: -0.7, z: 2.5   }, hideFromNav: true,
    },
    
    // Učebňa 2 (UC2.glb)
    {
      name: 'Učebňa 2', model: 'UC2.glb',
      cam: { x: -1.45, y: -0.53, z: -0.27 },    tgt: { x: -0.46, y: -0.60, z: -0.44 },
    },
    // --Orby--
    {
      name: 'Chodba 3 poschodie',  model: 'UC2.glb',  targetModel: 'Vchod.glb',
      cam: { x: -12.17, y: 7.10, z: -4.13 },      tgt: { x: -12.15, y: 7.05, z: -5.13 },
      orbPos: { x: 1.89, y: -0.7, z: 2.5    }, hideFromNav: true,
    },


  ],
  animDuration: 1400,
  bg: 0x87CEEB,

  labels: [
    // Centrum.glb Texty
    { text: 'Študentský parlament UKF S-1', model: 'Centrum.glb', pos: { x: -2, y: -0.1, z: -0.5 }, scale: 0.5 },
    { text: 'Erasmus Student Network UKF S-2', model: 'Centrum.glb', pos: { x: -2, y: -0.1, z: 5.49 }, scale: 0.5 },
    { text: 'Psychologické, Kariérne a Zdravotné Poradenstvo S-3', model: 'Centrum.glb', pos: { x: -2, y: -0.1, z: 7.63 }, scale: 0.5 },
    { text: 'Poradňa pre študentov so špecifickými potrebami S-4', model: 'Centrum.glb', pos: { x: 4, y: -0.1, z: 6 }, scale: 0.5 },
    { text: 'Manažér centra S-5', model: 'Centrum.glb', pos: { x: 6.18, y: -0.1, z: 5.25 }, scale: 0.5 },
    { text: 'Kuchynka', model: 'Centrum.glb', pos: { x: 5.92, y: -0.1, z: 0 }, scale: 0.5 },
    { text: 'Kuchynka', model: 'Centrum.glb', pos: { x: 5.92, y: -0.1, z: 4.3 }, scale: 0.5 },
    { text: 'Wc', model: 'Centrum.glb', pos: { x: 7.79, y: -0.1, z: 0 }, scale: 0.5 },
    // Ubytovanie.glb Texty
    { text: 'Ubytovňa', model: 'Ubytovanie.glb', pos: { x: 6.40, y: -1.25, z: -2.0 }, scale: 0.5 },
    // Tanečná sála.glb Texty
    { text: 'Sklad', model: 'Tanecna.glb', pos: { x: -2.8, y: -0.2, z: 5.04}, scale: 0.5 },
    { text: 'Miestnosť pre upratovačku', model: 'Tanecna.glb', pos: {x: -0.41, y: -0.2, z: -6.28}, scale: 0.5 },
    // Vchod.glb Texty
    { text: 'Kancelária', model: 'Vchod.glb', pos: {x: -0.5, y: 7.25, z: 1.40}, scale: 0.5 },
    { text: 'Kancelária', model: 'Vchod.glb', pos: {x: -0.5, y: 7.25, z: -3.40}, scale: 0.5 },
  ],
};

const setMsg = t => document.getElementById('load-msg').textContent = t;
setMsg('Vytváram scénu…');

const scene = new THREE.Scene();
scene.background = new THREE.Color(CONFIG.bg);
const camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, 0.5, 2000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(1);
renderer.setSize(innerWidth, innerHeight);
renderer.shadowMap.enabled = false;
renderer.toneMapping = THREE.LinearToneMapping;
renderer.toneMappingExposure = 1.0;
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById('canvas-container').appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(ambientLight);
const sun = new THREE.DirectionalLight(0xfff8e0, 3.0);
sun.position.set(50, 100, 50);
scene.add(sun);
const fill = new THREE.DirectionalLight(0xc8d8ff, 1.5);
fill.position.set(-50, 30, -50);
scene.add(fill);
const back = new THREE.DirectionalLight(0xffffff, 1.0);
back.position.set(0, 20, -80);
scene.add(back);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.12;
controls.enablePan = true;
controls.minDistance = 0.5;
controls.maxDistance = 500;
controls.maxPolarAngle = Math.PI * 0.85;
controls.screenSpacePanning = true;
// Vypni defaultny zoom - pouzijeme vlastny
controls.enableZoom = false;

// Vlastny zoom
let zoomVelocity = 0;
let buildingMeshes = [];

renderer.domElement.addEventListener('wheel', event => {
  event.preventDefault();

  if (isInterior) {
    // Interiér: zoom cez FOV - kamera ostáva na mieste, len sa mení zorný uhol
    const fovStep = event.deltaY > 0 ? 4 : -4;
    camera.fov = Math.max(30, Math.min(90, camera.fov + fovStep));
    camera.updateProjectionMatrix();
  } else {
    // Exteriér: klasický zoom s plynulým spomalením
    const distance = camera.position.distanceTo(controls.target);
    const speed = Math.max(distance * 0.08, 0.3);
    zoomVelocity += event.deltaY * 0.001 * speed;
  }
}, { passive: false });

function tickZoom() {
  if (isInterior || Math.abs(zoomVelocity) < 0.0001) {
    zoomVelocity = 0;
    return;
  }

  const distance = camera.position.distanceTo(controls.target);
  const newDist = Math.max(controls.minDistance, Math.min(controls.maxDistance, distance + zoomVelocity));
  const dir = camera.position.clone().sub(controls.target).normalize();

  // Pri zoomovaní dnu skontrolujeme či nie je stena v ceste
  // Lúč ide od kamery SMEROM k budove - zasiahne predné plochy stien
  if (zoomVelocity < 0 && buildingMeshes.length > 0) {
    const dirToBuilding = controls.target.clone().sub(camera.position).normalize();
    const raycaster = new THREE.Raycaster(camera.position.clone(), dirToBuilding, 0.1, distance);
    const hits = raycaster.intersectObjects(buildingMeshes, false);
    if (hits.length > 0) {
      const safeDistance = Math.max(hits[0].distance - 0.5, controls.minDistance);
      if (newDist < safeDistance) {
        camera.position.copy(controls.target).addScaledVector(dir, safeDistance);
        zoomVelocity = 0;
        controls.update();
        return;
      }
    }
  }

  camera.position.copy(controls.target).addScaledVector(dir, newDist);
  zoomVelocity *= 0.82;
  controls.update();
}

// ── ZRKADLÁ ──
function replaceMirrorsInModel(model) {
  const toReplace = [];
  model.traverse(mesh => {
    if (!mesh.isMesh) return;
    let materials;
    if (Array.isArray(mesh.material)) {
      materials = mesh.material;
    } else {
      materials = [mesh.material];
    }
    if (materials.some(material => material.name && material.name.toLowerCase().includes('zrkadlo'))) toReplace.push(mesh);
  });

  toReplace.forEach(mesh => {
    const box = new THREE.Box3().setFromObject(mesh);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const axes = [['x', size.x], ['y', size.y], ['z', size.z]];
    const minAxis = axes.sort((a,b) => a[1]-b[1])[0][0];
    const sorted = [size.x, size.y, size.z].sort((a,b) => b-a);
    const w = sorted[0];
    const h = sorted[1];

    const mirror = new Reflector(
      new THREE.PlaneGeometry(w, h),
      {
        clipBias: 0.003,
        textureWidth: innerWidth,
        textureHeight: innerHeight,
        color: new THREE.Color(0xaaaaaa),
        multisample: 4,
      }
    );

    mirror.position.copy(center);

    if (minAxis === 'x') {
      mirror.rotation.set(0, -Math.PI/2, 0);
      mirror.position.x += -0.01;
    } else if (minAxis === 'y') {
      mirror.rotation.set(-Math.PI / 2, 0, 0);
      mirror.position.y += 0.005;
    } else {
      mirror.rotation.set(0, Math.PI, 0);
      mirror.position.z += 0.005;
    }

    model.add(mirror);
    mesh.visible = false;
    console.log('Zrkadlo:', mesh.name, 'minAxis:', minAxis, 'center:', center.x.toFixed(2), center.y.toFixed(2), center.z.toFixed(2));
  });
}

function fitCameraToModel(object) {
  const box = new THREE.Box3().setFromObject(object);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  const distance = (maxDim / 2) / Math.tan(fov / 2) * 1.5;
  camera.position.set(center.x + distance * 0.6, center.y + distance * 0.5, center.z + distance * 0.6);
  controls.target.copy(center);
  controls.minDistance = maxDim * 0.1;
  controls.maxDistance = distance * 4;
  controls.update();
}

let currentWP = 0;
let anim = null;
function easeInOut(progress) {
  if (progress < 0.5) {
    return 2 * progress * progress;
  } else {
    return -1 + (4 - 2 * progress) * progress;
  }
}

function goTo(index) {
  if (index < 0 || index >= CONFIG.waypoints.length) return;
  currentWP = index;
  updateUI();
  const waypoint = CONFIG.waypoints[index];
  const currentPath = Object.keys(modelCache).find(k => modelCache[k] === currentModel);
  const modelToLoad = waypoint.targetModel || waypoint.model;
  if (modelToLoad && modelToLoad !== currentPath) {
    loadGLB(modelToLoad, index, () => animateCameraTo(waypoint));
    return;
  }
  showOrbsForModel(currentPath || waypoint.model);
  animateCameraTo(waypoint);
}

function animateCameraTo(waypoint) {
  if (!waypoint.cam) return;
  let tx, ty, tz;
  if (!waypoint.tgt) {
    const forwardVector = new THREE.Vector3();
    camera.getWorldDirection(forwardVector).multiplyScalar(0.01);
    tx = waypoint.cam.x + forwardVector.x; ty = waypoint.cam.y + forwardVector.y; tz = waypoint.cam.z + forwardVector.z;
  } else if (isInterior) {
    const forwardVector = new THREE.Vector3(waypoint.tgt.x - waypoint.cam.x, waypoint.tgt.y - waypoint.cam.y, waypoint.tgt.z - waypoint.cam.z).normalize().multiplyScalar(0.01);
    tx = waypoint.cam.x + forwardVector.x; ty = waypoint.cam.y + forwardVector.y; tz = waypoint.cam.z + forwardVector.z;
  } else {
    tx = waypoint.tgt.x; ty = waypoint.tgt.y; tz = waypoint.tgt.z;
  }
  anim = {
    from: { cx: camera.position.x, cy: camera.position.y, cz: camera.position.z,
            tx: controls.target.x,  ty: controls.target.y,  tz: controls.target.z },
    to:   { cx: waypoint.cam.x, cy: waypoint.cam.y, cz: waypoint.cam.z, tx, ty, tz },
    start: performance.now(),
  };
}

function tickAnim(now) {
  if (!anim) return;
  const progress = Math.min((now - anim.start) / CONFIG.animDuration, 1);
  const eased = easeInOut(progress);
  const lerp = (a, b) => a + (b - a) * eased;
  camera.position.set(lerp(anim.from.cx, anim.to.cx), lerp(anim.from.cy, anim.to.cy), lerp(anim.from.cz, anim.to.cz));
  controls.target.set(lerp(anim.from.tx, anim.to.tx), lerp(anim.from.ty, anim.to.ty), lerp(anim.from.tz, anim.to.tz));
  if (progress >= 1) anim = null;
}

// Collision
let roomBox = null;
let buildingSphere = null;
let isInterior = false;

function tickPushBack() {
  // Interiér: target sa nesmie dostať cez steny miestnosti
  if (isInterior && roomBox) {
    const margin = 0.8;
    const target = controls.target;
    const tx = Math.max(roomBox.min.x + margin, Math.min(roomBox.max.x - margin, target.x));
    const ty = Math.max(roomBox.min.y + 0.3,    Math.min(roomBox.max.y - 0.3,    target.y));
    const tz = Math.max(roomBox.min.z + margin, Math.min(roomBox.max.z - margin, target.z));
    if (tx !== target.x || ty !== target.y || tz !== target.z) {
      const diff = new THREE.Vector3(tx - target.x, ty - target.y, tz - target.z);
      controls.target.set(tx, ty, tz);
      camera.position.add(diff);
      controls.update();
    }
  }

  // Exteriér: sférická kolízia - funguje zo všetkých smerov rovnako (zoom, orbit, pan)
  if (!isInterior && buildingSphere) {
    const distFromCenter = camera.position.distanceTo(buildingSphere.center);
    if (distFromCenter < buildingSphere.radius) {
      // Vytlačíme kameru na povrch sféry
      const direction = camera.position.clone().sub(buildingSphere.center).normalize();
      camera.position.copy(buildingSphere.center).addScaledVector(direction, buildingSphere.radius);
      zoomVelocity = 0;
      controls.update();
    }
  }
}

// ── INFO ŠTÍTKY ──
const labelGroup = new THREE.Group();
scene.add(labelGroup);

// Rozdelí dlhý text na riadky aby sa zmestil do maxWidth
function wrapText(ctx, text, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    let testLine;
    if (currentLine === '') {
      testLine = words[i];
    } else {
      testLine = currentLine + ' ' + words[i];
    }

    if (ctx.measureText(testLine).width > maxWidth && currentLine !== '') {
      lines.push(currentLine);
      currentLine = words[i];
    } else {
      currentLine = testLine;
    }
  }

  lines.push(currentLine);
  return lines;
}

// Vytvorí textový štítok v 3D scéne
function createInfoLabel(label) {
  const padding = 14;
  const lineHeight = 32;
  const maxWidth = 300;

  // Pomocný canvas na meranie šírky textu pred kreslením
  const tempCtx = document.createElement('canvas').getContext('2d');

  // Rozdelíme text podľa \n a každý riadok zalomíme ak je príliš dlhý
  const allLines = [];
  const rawLines = label.text.split('\n');

  for (let i = 0; i < rawLines.length; i++) {
    const isTitle = (i === 0);
    if (isTitle) {
      tempCtx.font = 'bold 22px Segoe UI,sans-serif';
    } else {
      tempCtx.font = '17px Segoe UI,sans-serif';
    }
    const wrapped = wrapText(tempCtx, rawLines[i], maxWidth - padding * 2);

    for (let j = 0; j < wrapped.length; j++) {
      allLines.push({ text: wrapped[j], isTitle: isTitle });
    }
  }

  // Zistíme šírku podľa najdlhšieho riadku
  let longestLineWidth = 0;
  for (let i = 0; i < allLines.length; i++) {
    if (allLines[i].isTitle) {
      tempCtx.font = 'bold 22px Segoe UI,sans-serif';
    } else {
      tempCtx.font = '17px Segoe UI,sans-serif';
    }
    const lineWidth = tempCtx.measureText(allLines[i].text).width;
    if (lineWidth > longestLineWidth) longestLineWidth = lineWidth;
  }

  const canvasWidth = Math.ceil(longestLineWidth + padding * 2 + 8);
  const canvasHeight = allLines.length * lineHeight + padding * 2;

  // Nakreslíme pozadie a text na canvas
  const canvas = document.createElement('canvas');
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = 'rgba(0,0,0,0.65)';
  ctx.roundRect(4, 4, canvasWidth - 8, canvasHeight - 8, 10);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < allLines.length; i++) {
    if (allLines[i].isTitle) {
      ctx.fillStyle = '#ffe066';
      ctx.font = 'bold 22px Segoe UI,sans-serif';
    } else {
      ctx.fillStyle = '#fff';
      ctx.font = '17px Segoe UI,sans-serif';
    }
    ctx.fillText(allLines[i].text, canvasWidth / 2, padding + i * lineHeight + lineHeight / 2);
  }

  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(canvas),
    transparent: true,
    depthTest: false
  }));

  const scale = label.scale || 1;
  sprite.scale.set((canvasWidth / canvasHeight) * 0.5 * scale, 0.5 * scale, 1);
  sprite.position.set(label.pos.x, label.pos.y, label.pos.z);
  sprite.userData = { model: label.model };
  labelGroup.add(sprite);
}

function showLabelsForModel(modelPath) {
  while (labelGroup.children.length) labelGroup.remove(labelGroup.children[0]);
  (CONFIG.labels || []).forEach(label => { if (label.model === modelPath) createInfoLabel(label); });
}

// ── ORB SYSTÉM ──
const orbGroup = new THREE.Group();
scene.add(orbGroup);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function createOrb(waypoint, index) {
  const group = new THREE.Group();
  group.add(new THREE.Mesh(
    new THREE.OctahedronGeometry(0.2),
    new THREE.MeshStandardMaterial({ color: 0x0033cc, emissive: 0x0033cc, emissiveIntensity: 0.4, metalness: 0.3, roughness: 0.2, transparent: true, opacity: 0.9 })
  ));
  const ring = new THREE.Mesh(
    new THREE.RingGeometry(0.26, 0.34, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.4, side: THREE.DoubleSide })
  );
  ring.rotation.x = Math.PI / 2;
  group.add(ring);
  if (!waypoint.hideLabel) {
    const font = 'bold 24px Segoe UI,sans-serif';
    const padding = 14;
    const lineHeight = 32;
    const canvasWidth = 256;

    // Zmeráme text a zalomíme ho ak je príliš dlhý
    const tempCtx = document.createElement('canvas').getContext('2d');
    tempCtx.font = font;
    const lines = wrapText(tempCtx, waypoint.name, canvasWidth - padding * 2);

    const canvasHeight = lines.length * lineHeight + padding * 2;

    // Nakreslíme pozadie a text
    const canvas = document.createElement('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'rgba(0,0,0,0.6)';
    ctx.roundRect(4, 4, canvasWidth - 8, canvasHeight - 8, 10);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    for (let i = 0; i < lines.length; i++) {
      ctx.fillText(lines[i], canvasWidth / 2, padding + i * lineHeight + lineHeight / 2);
    }

    const label = new THREE.Sprite(new THREE.SpriteMaterial({
      map: new THREE.CanvasTexture(canvas),
      transparent: true
    }));

    label.scale.set(0.9, (canvasHeight / 64) * 0.225, 1);
    label.position.y = 0.55 + (lines.length - 1) * 0.1;
    group.add(label);
  }
  group.userData = { wpIndex: index, isOrb: true };
  group.position.set(waypoint.orbPos.x, waypoint.orbPos.y, waypoint.orbPos.z);
  orbGroup.add(group);
}

function updateOrbs(now) {
  const progress = now * 0.002;
  orbGroup.children.forEach((orb, i) => {
    const diamond = orb.children[0];
    if (diamond) diamond.rotation.y = progress + i;
    const ring = orb.children[1]; if (!ring) return;
    const scale = 1 + Math.sin(progress + i) * 0.12;
    ring.scale.set(scale, scale, scale);
    ring.material.opacity = 0.3 + Math.sin(progress + i) * 0.15;
  });
}

function showOrbsForModel(modelPath) {
  while (orbGroup.children.length) orbGroup.remove(orbGroup.children[0]);
  CONFIG.waypoints.forEach((waypoint, i) => {
    if (!waypoint.orbPos || waypoint.model !== modelPath) return;
    if (!waypoint.targetModel && !waypoint.hideFromNav) return; // hlavný waypoint miestnosti
    if (i === currentWP) return; // aktuálna pozícia - orb skry
    createOrb(waypoint, i);
  });
}

let mouseDownPos = { x: 0, y: 0 };
renderer.domElement.addEventListener('mousedown', event => { mouseDownPos = { x: event.clientX, y: event.clientY }; });
renderer.domElement.addEventListener('click', event => {
  const dx = event.clientX - mouseDownPos.x;
  const dy = event.clientY - mouseDownPos.y;
  if (dx * dx + dy * dy > 25) return; // pohyboval sa myšou = drag, nie klik
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(orbGroup.children, true);
  if (hits.length > 0) {
    let obj = hits[0].object;
    while (obj && !obj.userData.isOrb) obj = obj.parent;
    if (obj?.userData.isOrb) goTo(obj.userData.wpIndex);
  }
});

let hoveredOrb = null;
renderer.domElement.addEventListener('mousemove', event => {
  mouse.x = (event.clientX / innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(orbGroup.children, true);
  let newHover = null;
  if (hits.length > 0) {
    let obj = hits[0].object;
    while (obj && !obj.userData.isOrb) obj = obj.parent;
    if (obj?.userData.isOrb) newHover = obj;
  }
  if (newHover !== hoveredOrb) {
    if (hoveredOrb) hoveredOrb.children[0].material.color.setHex(0x0033cc);
    if (newHover)   newHover.children[0].material.color.setHex(0x4499ff);
    hoveredOrb = newHover;
  }
  if (newHover) {
    renderer.domElement.style.cursor = 'pointer';
  } else {
    renderer.domElement.style.cursor = 'default';
  }
});

function updateUI() {
  const waypoint = CONFIG.waypoints[currentWP];
  document.getElementById('waypoint-label').textContent = waypoint.name;
  document.getElementById('waypoint-sub').textContent = waypoint.desc || `Zastávka ${currentWP+1} / ${CONFIG.waypoints.length}`;
  document.querySelectorAll('.wp-btn').forEach(button => button.classList.toggle('active', +button.dataset.wpIndex === currentWP));
  document.querySelectorAll('.dot').forEach(dot => dot.classList.toggle('active', +dot.dataset.wpIndex === currentWP));
}

const wpWrap = document.getElementById('wp-buttons');
const prog   = document.getElementById('progress');
let navCount = 0;
CONFIG.waypoints.forEach((waypoint, i) => {
  if (waypoint.hideFromNav) return;
  navCount++;
  const btn = document.createElement('button');
  btn.className = 'wp-btn';
  btn.dataset.wpIndex = i;
  btn.innerHTML = `<span class="wp-num">Zastávka ${navCount}</span><span class="wp-name">${waypoint.name}</span>`;
  btn.onclick = () => goTo(i);
  wpWrap.appendChild(btn);
  const dot = document.createElement('div'); dot.className = 'dot'; dot.dataset.wpIndex = i;
  prog.appendChild(dot);
});

document.getElementById('prev-btn').onclick = () => goTo(currentWP - 1);
document.getElementById('next-btn').onclick = () => goTo(currentWP + 1);
document.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') goTo(currentWP + 1);
  if (event.key === 'ArrowLeft')  goTo(currentWP - 1);
});

function hideLoading() {
  document.getElementById('loading').classList.add('hidden');
  setTimeout(() => document.getElementById('hint').classList.add('hidden'), 4500);
}

const modelCache = {};
let currentModel = null;

// Nacitaj GLB subor (pouziva sa pre loadModelForWaypoint aj pre targetModel)
function loadGLB(path, wpIndex, onDone) {
  const waypoint = CONFIG.waypoints[wpIndex];

  if (modelCache[path]) {
    switchToModel(modelCache[path], path, waypoint, onDone);
    return;
  }

  setMsg('Načít avam ' + waypoint.name + '…');
  document.getElementById('loading').classList.remove('hidden');

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/draco/');
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.load(path,
    gltf => {
      gltf.scene.traverse(mesh => {
        if (!mesh.isMesh) return;
        mesh.castShadow = false; mesh.receiveShadow = false;
        let materials;
        if (Array.isArray(mesh.material)) {
          materials = mesh.material;
        } else {
          materials = [mesh.material];
        }
        materials.forEach(material => {
          if (material.transparent && material.opacity >= 0.99 && !material.alphaMap && !material.map) material.transparent = false;
          if (material.transparent) material.depthWrite = false;
        });
      });
      modelCache[path] = gltf.scene;
      if (path === 'Tanecna.glb') replaceMirrorsInModel(gltf.scene);
      switchToModel(gltf.scene, path, waypoint, onDone);
    },
    xhr => { if (xhr.total) setMsg(waypoint.name + ': ' + Math.round(xhr.loaded / xhr.total * 100) + ' %'); },
    err => {
      console.warn('GLB nenajdeny:', path, err);
      setMsg(path + ' nenajdeny');
      setTimeout(() => { document.getElementById('loading').classList.add('hidden'); if (onDone) onDone(); }, 1500);
    }
  );
}

function loadModelForWaypoint(index, onDone) {
  const waypoint = CONFIG.waypoints[index];
  loadGLB(waypoint.model, index, onDone);
}

function switchToModel(newScene, loadedPath, waypoint, onDone) {
  if (currentModel) scene.remove(currentModel);
  currentModel = newScene;
  scene.add(currentModel);

  const isExterior = loadedPath === 'budova.glb';
  isInterior = !isExterior;

  // Nastav kolíziu
  buildingMeshes = [];
  if (isInterior) {
    roomBox = new THREE.Box3().setFromObject(newScene);
    buildingSphere = null;
    camera.fov = 60;
    camera.updateProjectionMatrix();
  } else {
    roomBox = null;
    // Sféra okolo budovy - kamera nesmie byť vo vnútri (funguje zo všetkých smerov)
    const buildingBox = new THREE.Box3().setFromObject(newScene);
    buildingSphere = new THREE.Sphere();
    buildingBox.getBoundingSphere(buildingSphere);
    // Meshe pre raycast zoom kolíziu
    newScene.traverse(child => {
      if (child.isMesh) buildingMeshes.push(child);
    });
  }

  // Exteriér = obloha, interiér = tmavé pozadie
  if (isExterior) {
    scene.background = new THREE.Color(0x87CEEB);
    ambientLight.intensity = 2.5;
    sun.intensity  = 3.0;
    fill.intensity = 1.5;
    back.intensity = 1.0;
    controls.maxPolarAngle = Math.PI * 0.85;
    controls.minPolarAngle = 0;
  } else {
    scene.background = new THREE.Color(0x1a1a1a);
    ambientLight.intensity = 1.6;
    sun.intensity  = 0.8;
    fill.intensity = 0.6;
    back.intensity = 0.5;
    controls.maxPolarAngle = Math.PI * 0.9;
    controls.minPolarAngle = Math.PI * 0.1;
  }

  // Interier - pan povoleny ale target sa clampuje do miestnosti
  controls.enablePan = isExterior;

  const box = new THREE.Box3().setFromObject(newScene);
  const maxDim = Math.max(...box.getSize(new THREE.Vector3()).toArray());

  if (isExterior) {
    camera.near = 0.5;
  } else {
    camera.near = 0.15;
  }
  camera.updateProjectionMatrix();

  if (isExterior) {
    controls.minDistance = maxDim * 0.35;
    controls.maxDistance = maxDim * 5;
    controls.enableZoom = false;
  } else {
    // Interiér - first person, OrbitControls drží kameru na mieste (chôdza cez walkVelocity)
    controls.minDistance = 0.01;
    controls.maxDistance = 0.01;
    controls.enableZoom = false;
  }

  if (waypoint.cam) {
    camera.position.set(waypoint.cam.x, waypoint.cam.y, waypoint.cam.z);
    if (!waypoint.tgt) {
      const forwardVector = new THREE.Vector3();
      camera.getWorldDirection(forwardVector).multiplyScalar(0.01);
      controls.target.set(waypoint.cam.x + forwardVector.x, waypoint.cam.y + forwardVector.y, waypoint.cam.z + forwardVector.z);
    } else if (isInterior) {
      const forwardVector = new THREE.Vector3(waypoint.tgt.x - waypoint.cam.x, waypoint.tgt.y - waypoint.cam.y, waypoint.tgt.z - waypoint.cam.z).normalize().multiplyScalar(0.01);
      controls.target.set(waypoint.cam.x + forwardVector.x, waypoint.cam.y + forwardVector.y, waypoint.cam.z + forwardVector.z);
    } else {
      controls.target.set(waypoint.tgt.x, waypoint.tgt.y, waypoint.tgt.z);
    }
  } else {
    // Interiér - umiestni kameru dovnútra (stred miestnosti, výška očí)
    const center = box.getCenter(new THREE.Vector3());
    if (isExterior) {
      fitCameraToModel(currentModel);
    } else {
      camera.position.set(center.x, box.min.y + 1.7, center.z + maxDim * 0.3);
      controls.target.set(center.x, box.min.y + 1.7, center.z);
    }
  }

  controls.update();

  const center = box.getCenter(new THREE.Vector3());
  CONFIG.waypoints.filter(w => w.model === loadedPath && !w.orbPos).forEach(w => {
    w.orbPos = { x: center.x, y: box.min.y + 1.6, z: center.z };
  });

  showOrbsForModel(loadedPath);
  showLabelsForModel(loadedPath);
  // Reset lastCamPos na aktuálnu pozíciu kamery - hned po nastaveni
  lastCamPos.copy(camera.position);
  document.getElementById('loading').classList.add('hidden');

  if (onDone) onDone();
}

loadModelForWaypoint(0, () => { hideLoading(); goTo(0); });

(function animate(now) {
  requestAnimationFrame(animate);
  tickAnim(now);
  tickZoom();
  tickPushBack();
  updateOrbs(now);
  controls.update();
  renderer.render(scene, camera);
})(0);

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});
