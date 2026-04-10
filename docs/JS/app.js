import * as THREE from 'three';
import { GLTFLoader }    from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader }   from 'three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Reflector }     from 'three/addons/objects/Reflector.js';

const CONFIG = {
  waypoints: [
    // EXTERIÉR  (Budova.glb)
    {
      name: 'Exteriér', desc: 'Vonkajší pohľad na budovu',
      floor: 'exterier', model: 'Budova.glb',
      cam: { x: -34.39, y: 5.93, z: 20.03 }, tgt: { x: -4.87, y: -2.83, z: 2.23 },
    },
    // ORBY 
    { name: 'Hlavný vchod', desc: 'Hala',
      model: 'Budova.glb', targetModel: 'Vchod.glb',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
      orbPos: { x: -7.75, y: -5.5, z: 7 },
      hideFromNav: true
    },
    { name: 'Chodba k ubytovaniu', desc: 'Chodba vedúca k ubytovaniu',
      model: 'Budova.glb', targetModel: 'Ubytovanie.glb',
      cam: { x: 8, y: -1.48, z: -0.38 }, tgt: { x: 7, y: -1.48, z: -0.38 },
      orbPos: { x: 12, y: -4.5, z: -12.2 },
      hideFromNav: true
    },
    { name: 'Centrum', desc: 'Študentské centrum',
      model: 'Budova.glb', targetModel: 'Centrum.glb',
      cam: { x: 14.77, y: -0.05, z: -0.78 }, tgt: { x: 13.78, y: -0.14, z: -0.75 },
      orbPos: { x: 15.7, y: -5.46, z: 9.25 },
      hideFromNav: true
    },
    { name: 'Sála 2', desc: 'Druhá časť sály',
      model: 'Budova.glb', targetModel: 'Sala2.glb',
      cam: { x: -0.26, y: 0.68, z: 0.32 }, tgt: { x: -0.23, y: 0.54, z: -0.67 },
      orbPos: { x: 15.7, y: -5.46, z: -0.99 },
      hideFromNav: true
    },

    // Vstupná Hala (Vchod.glb)
    {
      name: 'Hala', desc: 'Hala s recepciou a vstupom do budovy',
      floor: 'prizemie', model: 'Vchod.glb',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
    },
    // ORBY
    {
      name: 'Exit',
      model: 'Vchod.glb', targetModel: 'Budova.glb',
      cam: { x: -34.39, y: 5.93, z: 20.03 }, tgt: { x: -4.87, y: -2.83, z: 2.23 },
      orbPos: { x: -1.5, y: -0.65, z: 5.0 },
      hideFromNav: true,
    },
    {
      name: 'Centrum', desc: 'Študentské centrum',
      model: 'Vchod.glb', targetModel: 'Centrum.glb',
      cam: { x: -0.55, y: -0.03, z: -0.22 }, tgt: { x: 0.21, y: -0.12, z: 0.42 },
      orbPos: { x: 1.10, y: -0.65, z: 6.05 },
      hideFromNav: true,
    },
    {
      name: 'Sala 1', desc: 'Prvá časť sály',
      model: 'Vchod.glb', targetModel: 'Sala1.glb',
      cam: { x: -0.03, y: -0.53, z: -0.30 }, tgt: { x: -0.03, y: -0.54, z: -0.20 },
      orbPos: { x: 5.5,   y: -0.65, z: -0.75 },
      hideFromNav: true,
    },
    {
      name: 'Sala 2', desc: 'Druhá časť sály',
      model: 'Vchod.glb',  targetModel: 'Sala2.glb',
      cam: { x: -0.26, y: 0.68, z: 0.32 }, tgt: { x: -0.23, y: 0.54, z: -0.67 },
      orbPos: { x: 5.5,  y: -0.65, z: -3.5 },
      hideFromNav: true,
    },
    {
      name: 'Chodba k Ubytovaniu', desc: 'Chodba vedúca k ubytovaniu',
      model: 'Vchod.glb', targetModel: 'Ubytovanie.glb',
      cam: { x: 0.38, y: -2.12, z: 5.45 }, tgt: { x: 0.37, y: -2.04, z: 4.45 },
      orbPos: { x: 5, y: -0.65, z: -6.5},
      hideFromNav: true,
    },
    { name: '1. poschodie', desc: 'Prechod na 1. poschodie',
      model: 'Vchod.glb', floor: 'poschodie1',
      cam: { x: -2.11, y: 3.58, z: 2.01 }, tgt: { x: -1.11, y: 3.47, z: 2.04 },
      orbPos: { x: -4, y: -0.65, z: 1.10 },
      hideFromNav: true
    },
    { name: 'Prízemie', desc: 'Prechod na prízemie',
      model: 'Vchod.glb', floor: 'prizemie',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
      orbPos: { x: -3.14, y: 3.0, z: 2.91},
      hideFromNav: true
    },
    { name: '1. poschodie', desc: 'Prechod na 1. poschodie',
      model: 'Vchod.glb', floor: 'poschodie1',
      cam: { x: -2.09, y: 3.58, z: 2.01 }, tgt: { x: -2.10, y: 3.58, z: 2.01 },
      orbPos: { x: -2.8, y: 6.5, z: 2.91  },
      hideFromNav: true
    },
    { name: '2. poschodie', desc: 'Prechod na 2. poschodie',
      model: 'Vchod.glb', floor: 'poschodie2',
      cam: { x: -1.83, y: 7.06, z: 1.34 }, tgt: { x: -2.53, y: 6.98, z: 0.62 },
      orbPos: { x: -3.21, y: 3, z: 1.18 },
      hideFromNav: true
    },
    { name: '2. poschodie', desc: 'Zmena pohľadu na 2. poschodí',
      model: 'Vchod.glb', floor: 'poschodie2',
      cam: { x: -2.58, y: 7.16, z: -3.69 }, tgt: null,
      orbPos: { x: -2.58, y: 6.8, z: -3.69 },
      hideFromNav: true, hideLabel: true
    },
    { name : '2. poschodie', desc: 'Zmena pohľadu na 2. poschodí',
      model: 'Vchod.glb', floor: 'poschodie2',
      cam: { x: -12.17, y: 7.10, z: -4.13 }, tgt: { x: -12.15, y: 7.05, z: -5.13 },
      orbPos: { x: -12.17, y: 6.8, z: -4.13 },
      hideFromNav: true, hideLabel: true
    },
    {
      name: '2. poschodie', desc: 'Zmena pohľadu na 2. poschodí',
      model: 'Vchod.glb', floor: 'poschodie2',
      cam: { x: -1.83, y: 7.06, z: 1.34 }, tgt: null,
      orbPos: { x: -1.83, y: 6.8, z: 1.34 },
      hideFromNav: true, hideLabel: true
    },
    {
      name: 'Počítačová učebňa', desc: 'Učebňa na 2. poschodí',
      model: 'Vchod.glb', targetModel: 'Infmiestnosť.glb',
      cam: { x: -0.68, y: -0.13, z: 1.67 }, tgt: { x: -0.74, y: -0.20, z: 2.67 },
      orbPos: { x: -1.25, y: 6.8, z: 3 },
      hideFromNav: true
    },
    {
      name: 'Učebna 1',  desc: 'Učebňa na 2. poschodí',
      model: 'Vchod.glb', targetModel: 'UC1.glb',
      cam: { x: -2.69, y: -0.41, z: -0.39 }, tgt: { x: -1.70, y: -0.54, z: -0.42 },
      orbPos: { x: -11, y: 6.8, z: -5 },
      hideFromNav: true
    },
    {
      name: 'Učebna 2',  desc: 'Učebňa na 2. poschodí',
      model: 'Vchod.glb', targetModel: 'UC2.glb',
      cam: { x: -1.45, y: -0.53, z: -0.27 }, tgt: { x: -0.46, y: -0.60, z: -0.44 },
      orbPos: { x: -13.53, y: 6.8, z: -5  },
      hideFromNav: true
    },
    {
      name: 'Tanečná sála',  desc: 'Sála na tanečné kurzy',
      model: 'Vchod.glb', targetModel: 'Tanecna.glb',
      cam: { x: -0.21, y: -0.40, z: 1.83 }, tgt: { x: 0.79, y: -0.41, z: 1.83 },
      orbPos: { x: -0.75, y: 3.25, z: 1.95  },
      hideFromNav: true
    },

    //Centrum (Centrum.glb)
    {
      name: 'Centrum',  desc: 'Študentské centrum',
      floor: 'prizemie', model: 'Centrum.glb',
      cam: { x: -0.55, y: -0.03, z: -0.22 }, tgt: { x: 0.21, y: -0.12, z: 0.42 },
    },
    // ORBY
    {
      name: 'Hala', desc: 'Hala s recepciou a vstupom do budovy',
      model: 'Centrum.glb', targetModel: 'Vchod.glb',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
      orbPos: { x: -0.5, y: -0.5, z: -1.5 },
      hideFromNav: true,
    },
    {
      name : 'Centrum', desc: 'Zmena pohľadu v študentskom centre',
      model: 'Centrum.glb',
      cam: { x: -0.55, y: -0.03, z: -0.22 }, tgt: null,
      orbPos: { x: -0.55, y: -0.5, z: -0.22 },
      hideFromNav: true, hideLabel: true
    },
    {
      name : 'Centrum', desc: 'Zmena pohľadu v študentskom centre',
      model: 'Centrum.glb',
      cam: { x: -0.29, y: -0.05, z: 5.16 }, tgt: null,
      orbPos: { x: -0.29, y: -0.5, z: 5.16 },
      hideFromNav: true, hideLabel: true
    },
    {
      name : 'Centrum', desc: 'Zmena pohľadu v študentskom centre',
      model: 'Centrum.glb',
      cam: { x: 3.70, y: -0.11, z: 5.34 }, tgt: null,
      orbPos: { x: 3.70, y: -0.5, z: 5.34 },
      hideFromNav: true, hideLabel: true
    },
    {
      name : 'Centrum', desc: 'Zmena pohľadu v študentskom centre',
      model: 'Centrum.glb',
      cam: { x: 9.14, y: -0.12, z: -0.77 }, tgt: null,
      orbPos: { x: 9.14, y: -0.5, z: -0.77 },
      hideFromNav: true, hideLabel: true
    },
    {
      name: 'Sala 1',  desc: 'Prvá časť sály',
      model: 'Centrum.glb', targetModel: 'Sala1.glb',
      cam: { x: -0.03, y: -0.53, z: -0.30 }, tgt: { x: -0.03, y: -0.54, z: -0.20 },
      orbPos: { x: 4.89, y: -0.5, z: -1.7 },
      hideFromNav: true
    },
    {
      name: 'Sala 1',  desc: 'Prvá časť sály',
      model: 'Centrum.glb', targetModel: 'Sala1.glb',
      cam: { x: -0.03, y: -0.53, z: -0.30 }, tgt: { x: -0.03, y: -0.54, z: -0.20 },
      orbPos: { x: 15.23, y: -0.5, z: -1.7 },
      hideFromNav: true
    },
    {
      name: 'Exit',
      model: 'Centrum.glb', targetModel: 'Budova.glb',
      cam: { x: -34.39, y: 5.93, z: 20.03 }, tgt: { x: -4.87, y: -2.83, z: 2.23 },
      orbPos: { x: 15.50, y: -0.5, z: -0.82 },
      hideFromNav: true
    },

    // Ubytovanie (Ubytovanie.glb)
    {
      name: 'Chodba k ubytovaniu', desc: 'Chodba vedúca k ubytovaniu',
      floor: 'prizemie', model: 'Ubytovanie.glb',
      cam: { x: 0.38, y: -0.28, z: -0.11 }, tgt: { x: 0.93, y: -0.44, z: -0.22 },
    },
    //  ORBY
    {
      name : 'Chodba k Ubytovaniu', desc: 'Zmena pohľadu v chodbe ',
      model: 'Ubytovanie.glb',
      cam: { x: 0.38, y: -2.49, z: 5.46 }, tgt: null,
      orbPos: { x: 0.38, y: -2.5, z: 5.45 },
      hideFromNav: true, hideLabel: true
    },
    {
      name : 'Chodba k Ubytovaniu', desc: 'Zmena pohľadu v chodbe',
      model: 'Ubytovanie.glb',
      cam: { x: 0.38, y: -0.28, z: -0.11 }, tgt: null,
      orbPos: { x: 0.38, y: -0.28, z: -0.11 },
      hideFromNav: true, hideLabel: true
    },
    {
      name : 'Chodba k Ubytovaniu', desc: 'Zmena pohľadu v chodbe',
      model: 'Ubytovanie.glb',
      cam: { x: 6.24, y: -1.42, z: -0.43 }, tgt:null,
      orbPos: { x: 6.24, y: -1.42, z: -0.43 },
      hideFromNav: true, hideLabel: true
    },
    {
      name: 'Tanečná sála',  desc: 'Tanečná sála na tanečné kurzy',
      model: 'Ubytovanie.glb', targetModel: 'Tanecna.glb',
      cam: { x: -0.21, y: -0.40, z: 1.83 }, tgt: { x: 0.79, y: -0.41, z: 1.83 },
      orbPos: { x: -0.80, y: -0.50, z: 1.63 },
      hideFromNav: true
    },
    {
      name: 'Hala', desc: 'Hala s recepciou a vstupom do budovy',
      model: 'Ubytovanie.glb', targetModel: 'Vchod.glb',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
      orbPos: { x: 0.31, y: -2.65, z: 6.15 },
      hideFromNav: true
    },
    {
      name: 'Exit',
      model: 'Ubytovanie.glb', targetModel: 'Budova.glb',
      cam: { x: -34.39, y: 5.0, z: 20.03 }, tgt: { x: -4.87, y: -2.83, z: 2.23 },
      orbPos: { x: 8.32, y: -1.75, z: -0.36 },
      hideFromNav: true,
    },

    //Sala 1 (Sala1.glb)
    {
      name: 'Sála 1', desc: 'Prvá časť sály',
      floor: 'prizemie', model: 'Sala1.glb',
      cam: { x: -0.03, y: -0.53, z: -0.30 }, tgt: { x: -0.03, y: -0.54, z: -0.20 },
    },
    //  ORBY
    {
      name: 'Hala', desc: 'Hala s recepciou a vstupom do budovy',
      model: 'Sala1.glb', targetModel: 'Vchod.glb',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
      orbPos: { x: -5.25, y: -1.25, z: -3.25 },
      hideFromNav: true
    },
    {
      name: 'Centrum', desc: 'Študentské centrum',
      model: 'Sala1.glb', targetModel: 'Centrum.glb',
      cam: { x: -0.55, y: -0.03, z: -0.22 }, tgt: { x: -0.54, y: -0.03, z: -0.21 },
      orbPos: { x: -5.25, y: -1.25, z: 3.8 },
      hideFromNav: true
    },
    {
      name: 'Centrum', desc: 'Študentské centrum',
      model: 'Sala1.glb',  targetModel: 'Centrum.glb',
      cam: { x: -0.55, y: -0.03, z: -0.22 }, tgt: { x: -0.54, y: -0.03, z: -0.21 },
      orbPos: { x: 5.0, y: -1.25, z: 3.80 },
      hideFromNav: true
    },

    //Sala 2 (Sala2.glb)
    {
      name: 'Sála 2', desc: 'Druhá časť sály',
      floor: 'prizemie', model: 'Sala2.glb',
      cam: { x: -0.26, y: 0.68, z: 0.32 }, tgt: { x: -0.23, y: 0.54, z: -0.67 },
    },
    //  ORBY
    {
      name: 'Hala', desc: 'Hala s recepciou a vstupom do budovy',
      model: 'Sala2.glb',  targetModel: 'Vchod.glb',
      cam: { x: 1.94, y: -0.05, z: 0.79 }, tgt: { x: 1.85, y: -0.05, z: 0.84 },
      orbPos: { x: -5.50, y: -0.7, z: 2.80 },
      hideFromNav: true
    },
    {
      name: 'Exit',
      model: 'Sala2.glb', targetModel: 'Budova.glb',
      cam: { x: -34.39, y: 5.93, z: 20.03 }, tgt: { x: -4.87, y: -2.83, z: 2.23 },
      orbPos: { x: 5.5, y: -0.7, z: 4 },
      hideFromNav: true
    },

    //Tanečná sála (Tanecna.glb)
    {
      name: 'Tanečná miestnosť', desc: 'Tanečná sála na tanečné kurzy',
      floor: 'poschodie1', model: 'Tanecna.glb',
      cam: { x: -0.21, y: -0.40, z: 1.83 }, tgt: { x: 0.79, y: -0.41, z: 1.83 }
    },
    // ORBY
     {
      model: 'Tanecna.glb', desc: 'Zmena pohľadu v tanečnej sále',
      cam: { x: -0.21, y: -0.40, z: 1.83 }, tgt: null,
      orbPos: { x: -0.21, y: -0.7, z: 1.83 },
      hideFromNav: true, hideLabel: true
    },
    {
      model: 'Tanecna.glb', desc: 'Zmena pohľadu v tanečnej sále',
      cam: { x: -0.33, y: -0.30, z: -3.98 }, tgt: null,
      orbPos: { x: -0.33, y: -0.7, z: -3.98  },
      hideFromNav: true, hideLabel: true
    },
    {
      name: 'Poschodie', desc: 'Prechod na  1. poschodie',
      model: 'Tanecna.glb', targetModel: 'Vchod.glb', floor: 'poschodie1',
      cam: { x: -2.11, y: 3.58, z: 2.01 }, tgt: { x: -1.11, y: 3.47, z: 2.04 },
      orbPos: { x: -2.8, y: -0.7, z: 1.89 },
      hideFromNav: true
    },
    {
      name: 'Spoločenská miestnosť', desc: 'Miestnosť na spoločenské akcie',
      model: 'Tanecna.glb',  targetModel: 'Spolocenska.glb',
      cam: { x: -0.12, y: 0, z: 0.23 }, tgt: { x: -1.12, y: 0, z: 0.24 },
      orbPos: { x: -1.29, y: -0.7, z: 8.10 },
      hideFromNav: true
    },
    {
      name: 'Kapela miestnosť', desc: 'Miestnosť pre kapelu',
      model: 'Tanecna.glb', targetModel: 'Kapela.glb',
      cam: { x: 0.39, y: -0.28, z: -0.12 }, tgt: { x: 0.39, y: -0.28, z: -0.11 },
      orbPos: { x: -2.7, y: -0.7, z: -3.61 },
      hideFromNav: true
    },
    {
      name: 'Chodba k ubytovni', desc: 'Chodba vedúca k ubytovaniu',
      model: 'Tanecna.glb',  targetModel: 'Ubytovanie.glb',
      cam: { x: 0.38, y: -0.28, z: -0.11 }, tgt: { x: 0.93, y: -0.44, z: -0.22 },
      orbPos: { x: 2.16, y: -0.7, z: -6.25 },
      hideFromNav: true
    },
    {
      name: 'Predsieň', desc: 'Malá chodba vedúca k šatni a nácvikovej miestnosti',
      model: 'Tanecna.glb',  targetModel: 'Chodba.glb',
      cam: { x: -2.13, y: -0.21, z: -0.16 }, tgt: { x: -1.21, y: -0.53, z: 0.09 },
      orbPos: {  x: 2.7, y: -0.7, z: 7.91 },
      hideFromNav: true
    },

    // Spoločenská miestnosť (Spolocenska.glb)
    {
      name: 'Spoločenská miestnosť', desc: 'Miestnosť na spoločenské akcie',
      floor: 'poschodie1', model: 'Spolocenska.glb',
      cam: { x: -0.12, y: 0, z: 0.23 }, tgt: { x: -1.12, y: 0, z: 0.24 },
    },
    // ORBY
    {
      name: 'Tanečná miestnosť', desc: 'Tanečná sála na tanečné kurzy',
      model: 'Spolocenska.glb',  targetModel: 'Tanecna.glb',
      cam: { x: -0.21, y: -0.40, z: 1.83 }, tgt: { x: 0.79, y: -0.41, z: 1.83 },
      orbPos: { x: 2.70, y: -0.55, z: -1.03 },
      hideFromNav: true
    },

    // Kapela miestnosť (Kapela.glb)
    {
      name: 'Miestnosť pre kapelu', desc: 'Miestnosť pre kapelu',
      floor: 'poschodie1', model: 'Kapela.glb',
      cam: { x: 0.39, y: -0.28, z: -0.12 }, tgt: { x: 0.39, y: -0.28, z: -0.11 },
    },
    // ORBY
    {
      name: 'Tanečná miestnosť', desc: 'Tanečná sála na tanečné kurzy',
      model: 'Kapela.glb', targetModel: 'Tanecna.glb',
      cam: { x: -0.21, y: -0.40, z: 1.83 }, tgt: { x: 0.79, y: -0.41, z: 1.83 },
      orbPos: { x: 2.25, y: -0.7, z: -0.81 },
      hideFromNav: true
    },

    // Predsieň (Chodba.glb)
    {
      name: 'Malá chodba', desc: 'Malá chodba vedúca k šatni a nácvikovej miestnosti',
      floor: 'poschodie1', model: 'Chodba.glb',
      cam: { x: -2.13, y: -0.21, z: -0.16 }, tgt: { x: -1.21, y: -0.53, z: 0.09 },
    },
    // ORBY
    {
      name: 'Tanečná miestnosť', desc: 'Tanečná sála na tanečné kurzy',
      model: 'Chodba.glb', targetModel: 'Tanecna.glb',
      cam: { x: -0.21, y: -0.40, z: 1.83 }, tgt: { x: 0.79, y: -0.41, z: 1.83 },
      orbPos: { x: -3.2, y: -0.30, z: 0.07 },
      hideFromNav: true
    },
    {
      name: 'Nácviková miestnosť', desc: 'Miestnosť na nacvičovanie',
      model: 'Chodba.glb',  targetModel: 'Sklad.glb',
      cam: { x: -0.04, y: -0.62, z: -0.25 }, tgt: { x: -0.90, y: -0.80, z: 0.23 },
      orbPos: { x: -0.65, y: -0.8, z: 0.65 },
      hideFromNav: true
    },
    {
      name: 'Šatňa', desc: 'Miestnosť s kostýmami',
      model: 'Chodba.glb', targetModel: 'Satna.glb',
      cam: { x: -1.76, y: -0.47, z: 0.13 }, tgt: { x: -0.79, y: -0.69, z: 0.20 },
      orbPos: { x: 2.7, y: -0.8, z: -0.08  },
      hideFromNav: true
    },

    // Nácviková miestnosť (Sklad.glb)
    {
      name: 'Nácviková miestnosť', desc: 'Miestnosť na nacvičovanie',
      floor: 'poschodie1', model: 'Sklad.glb',
      cam: { x: -0.04, y: -0.62, z: -0.25 }, tgt: { x: -0.90, y: -0.80, z: 0.23 },
    },
    // ORBY
    {
      name: 'Predsieň', desc: 'Malá chodba vedúca k šatni a nácvikovej miestnosti',
      model: 'Sklad.glb', targetModel: 'Chodba.glb',
      cam: { x: -2.13, y: -0.21, z: -0.16 }, tgt: { x: -1.21, y: -0.53, z: 0.09 },
      orbPos: { x: -0.65, y: -0.9, z: -1.30 },
      hideFromNav: true
    },

    //  Šatňa (Satna.glb)
    {
      name: 'Šatňa', desc: 'Miestnosť s kostýmami',
      floor: 'poschodie1', model: 'Satna.glb',
      cam: { x: -1.76, y: -0.47, z: 0.13 }, tgt: { x: -0.79, y: -0.69, z: 0.20 },
    },
    // ORBY
    {
      name: 'Predsieň', desc: 'Malá chodba vedúca k šatni a nácvikovej miestnosti',
      model: 'Satna.glb', targetModel: 'Chodba.glb',
      cam: { x: -2.13, y: -0.21, z: -0.16 }, tgt: { x: -1.21, y: -0.53, z: 0.09 },
      orbPos: { x: -2.15, y: -0.9, z: -2.02  },
      hideFromNav: true
    },

    // Učebňa Informatiky (Infmiestnosť.glb)
    {
      name: 'Počítačová učebňa', desc: 'Učebňa na 2. poschodí',
      floor: 'poschodie2', model: 'Infmiestnosť.glb',
      cam: { x: -0.68, y: -0.13, z: 1.67 }, tgt: { x: -0.74, y: -0.20, z: 2.67 },
    },
    // ORBY
    {
      name: 'Chodba 2. poschodie', desc: 'Chodba na 2. poschodí',
      model: 'Infmiestnosť.glb', targetModel: 'Vchod.glb', floor: 'poschodie2',
      cam: { x: -1.83, y: 7.06, z: 1.34 }, tgt: { x: -2.53, y: 6.98, z: 0.62 },
      orbPos: { x: -0.85, y: -0.5, z: -1 },
      hideFromNav: true
    },

    // Učebňa 1 (UC1.glb)
    {
      name: 'Učebňa 1', desc: 'Učebňa na 2. poschodí',
      floor: 'poschodie2', model: 'UC1.glb',
      cam: { x: -2.69, y: -0.41, z: -0.39 }, tgt: { x: -1.70, y: -0.54, z: -0.42 },
    },
    // ORBY
    {
      name: 'Chodba', desc: 'Chodba na 2. poschodí',
      model: 'UC1.glb', targetModel: 'Vchod.glb', floor: 'poschodie2',
      cam: { x: -12.17, y: 7.10, z: -4.13 }, tgt: { x: -12.15, y: 7.05, z: -5.13 },
      orbPos: { x: -1.96, y: -0.7, z: 2.5 },
      hideFromNav: true
    },

    // Učebňa 2 (UC2.glb)
    {
      name: 'Učebňa 2', desc: 'Učebňa na 2. poschodí',
      floor: 'poschodie2', model: 'UC2.glb',
      cam: { x: -1.45, y: -0.53, z: -0.27 }, tgt: { x: -0.46, y: -0.60, z: -0.44 },
    },
    // ORBY
    {
      name: 'Chodba', desc: 'Chodba na 2. poschodí',
      model: 'UC2.glb', targetModel: 'Vchod.glb', floor: 'poschodie2',
      cam: { x: -12.17, y: 7.10, z: -4.13 }, tgt: { x: -12.15, y: 7.05, z: -5.13 },
      orbPos: { x: 1.89, y: -0.7, z: 2.5    },
      hideFromNav: true
    },


  ],
  floors: [
    { id: 'exterier',   label: 'Exteriér' },
    { id: 'prizemie',   label: 'Prízemie' },
    { id: 'poschodie1', label: '1. poschodie' },
    { id: 'poschodie2', label: '2. poschodie' },
  ],


  labels: [
    // Centrum.glb TEXTY
    {
      text: 'Študentský parlament UKF S-1', model: 'Centrum.glb',
      pos: { x: -1.5, y: -0.1, z: -0.40 }, scale: 0.5
    },
    {
      text: 'Erasmus Student Network UKF S-2', model: 'Centrum.glb',
      pos: { x: -1.5, y: -0.1, z: 5.49 }, scale: 0.5
    },
    {
      text: 'Psychologické, Kariérne a Zdravotné Poradenstvo S-3', model: 'Centrum.glb',
      pos: { x: -1.5, y: -0.1, z: 7 }, scale: 0.5
    },
    {
      text: 'Poradňa pre študentov so špecifickými potrebami S-4', model: 'Centrum.glb',
      pos: { x: 4.10, y: -0.1, z: 6 }, scale: 0.5
    },
    {
      text: 'Manažér centra S-5', model: 'Centrum.glb',
      pos: { x: 6.18, y: -0.1, z: 5.25 }, scale: 0.5
    },
    {
      text: 'Kuchynka', model: 'Centrum.glb',
      pos: { x: 6, y: -0.1, z: -0.15 }, scale: 0.5
    },
    {
      text: 'Kuchynka', model: 'Centrum.glb',
      pos: { x: 5.0, y: -0.1, z: 4.70 }, scale: 0.5
    },
    {
      text: 'Wc', model: 'Centrum.glb',
      pos: { x: 7.79, y: -0.1, z: 0 }, scale: 0.5
    },
    // Ubytovanie.glb TEXTY
    {
      text: 'Ubytovňa', model: 'Ubytovanie.glb',
      pos: { x: 6.40, y: -1.25, z: -1.75 }, scale: 0.5
    },
    // Tanečná sála.glb TEXTY
    {
      text: 'Sklad', model: 'Tanecna.glb',
      pos: { x: -2.8, y: -0.2, z: 5.04}, scale: 0.5
    },
    {
      text: 'Miestnosť pre upratovačku', model: 'Tanecna.glb',
      pos: {x: -0.41, y: -0.2, z: -6.28}, scale: 0.5
    },
    // Vchod.glb TEXTY
    {
      text: 'Kancelária', model: 'Vchod.glb',
      pos: {x: -0.70, y: 7.25, z: 1.40}, scale: 0.5
    },
    {
      text: 'Kancelária', model: 'Vchod.glb',
      pos: {x: -0.70, y: 7.25, z: -3.40}, scale: 0.5
    },
  ],
};

// NASTAVENIE SCÉNY

// Vytvorenie scény
const scene = new THREE.Scene();
// Načítanie textu pri načítavaní scény
const setLoadingText = text => document.getElementById('load-msg').textContent = text;
setLoadingText('Vytváram scénu…');
// Nastavenie pozadia
scene.background = new THREE.Color(0x87CEEB,);
// Nastavenie kamery
const camera = new THREE.PerspectiveCamera(65, innerWidth / innerHeight, 0.5, 2000);
// Nastavenie renderu
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(1);
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.getElementById('canvas-container').appendChild(renderer.domElement);
// Pridanie svetiel
// Hlavné svetlo, ktoré osvetľuje scénu rovnomerne
const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
scene.add(ambientLight);
// Hlavné smerové svetlo, ktoré simuluje slnko
const sun = new THREE.DirectionalLight(0xfff8e0, 3.0);
sun.position.set(50, 100, 50);
scene.add(sun);
// Doplnkové smerové svetlo, ktoré osvetľuje scénu z opačnej strany a zjemňuje tiene
const fill = new THREE.DirectionalLight(0xc8d8ff, 1.5);
fill.position.set(-50, 30, -50);
scene.add(fill);
// Jemné zadné svetlo, ktoré oddeluje objekty od pozadia
const back = new THREE.DirectionalLight(0xffffff, 1.0);
back.position.set(0, 20, -80);
scene.add(back);
// Pridanie ovládania kamery
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.12;
controls.enablePan = true;
controls.maxPolarAngle = Math.PI * 0.85;
controls.screenSpacePanning = true;
controls.enableZoom = false;

// ZOOM
// Vlastny zoom
let zoomSpeed = 0;
let exteriorMeshes = [];

// Rozlíšenie medzi interiérom a exteriérom pre zoomovanie
renderer.domElement.addEventListener('wheel', event => {
  event.preventDefault();
  // Určenie, či sme v interiéri alebo exteriéri na základe aktuálne načítaného modelu
  if (interiorMode) {
    // Interiér: zoom cez FOV - kamera ostáva na mieste, len sa mení zorný uhol
    if (event.deltaY > 0) {
      camera.fov = camera.fov + 4;
    } else {
      camera.fov = camera.fov - 4;
    }
    if (camera.fov < 30) {
      camera.fov = 30;
    }
    if (camera.fov > 90) {
      camera.fov = 90;
    }
    camera.updateProjectionMatrix();
  } else {
    // Exteriér: klasický zoom s plynulým spomalením
    const distance = camera.position.distanceTo(controls.target);
    const speed = Math.max(distance * 0.08, 0.3);
    zoomSpeed += event.deltaY * 0.001 * speed;
  }
},
// Pasívne nastavenie umožňuje plynulé scrollovanie bez zadrhávania, ale musíme manuálne spracovať zoomovanie
{ passive: false });
// Funkcia na aktualizáciu pozície kamery pri zoomovaní v exteriéri, ktorá sa volá v hlavnej animačnej slučke
function updateZoom() {
  if (interiorMode || Math.abs(zoomSpeed) < 0.0001) {
    zoomSpeed = 0;
    return;
  }
  // Vypočítanie novej pozície kamery na základe aktuálnej vzdialenosti a smeru pohľadu
  const distance = camera.position.distanceTo(controls.target);
  const newDist = Math.max(controls.minDistance, Math.min(controls.maxDistance, distance + zoomSpeed));
  const dir = camera.position.clone().sub(controls.target).normalize();
  // Ak sa približujeme k budove, vykonáme raycast, aby sme zistili, či nás nečaká kolízia s exteriérovou geometriou. Ak áno, zastavíme zoom tesne pred kolíziou.
  if (zoomSpeed < 0 && exteriorMeshes.length > 0) {
    const dirToBuilding = controls.target.clone().sub(camera.position).normalize();
    const raycaster = new THREE.Raycaster(camera.position.clone(), dirToBuilding, 0.1, distance);
    const hits = raycaster.intersectObjects(exteriorMeshes, false);
    if (hits.length > 0) {
      const safeDistance = Math.max(hits[0].distance - 0.5, controls.minDistance);
      if (newDist < safeDistance) {
        camera.position.copy(controls.target).addScaledVector(dir, safeDistance);
        zoomSpeed = 0;
        return;
      }
    }
  }
  // Aktualizácia pozície kamery
  camera.position.copy(controls.target).addScaledVector(dir, newDist);
  zoomSpeed *= 0.82;
}

// SPRÁVA PAMÄTE
function disposeModel(model) {
  model.traverse(node => {
    if (node.isReflector) {
      if (node.getRenderTarget) node.getRenderTarget().dispose();
      return;
    }
    if (node.geometry) {
      node.geometry.dispose();
    }
    let materials = [];
    if (Array.isArray(node.material)) {
      materials = node.material;
    } else {
      materials = [node.material];
    }
    materials.forEach(material => {
      if (!material) return;
      ['map','normalMap','roughnessMap','metalnessMap','emissiveMap','aoMap','lightMap','alphaMap','envMap'].forEach(key => {
        if (material[key]) material[key].dispose();
      });
      material.dispose();
    });
  });
}
// Funkcia na vyčistenie skupiny zrkadiel, ktorá sa volá pred načítaním nového modelu, aby sa uvoľnili zdroje a zabránilo se hromadeniu zrkadiel v pamäti
function clearGroup(group) {
  group.traverse(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
      if (obj.material.map) obj.material.map.dispose();
      obj.material.dispose();
    }
  });
  while (group.children.length) group.remove(group.children[0]);
}
// Funkcia na nájdenie meshov, ktoré majú materiál s názvom obsahujúcím "zrkadlo", a ich nahradenie skutočnými zrkadlami pomocou tried Reflector z Three.js.
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
// Pre každý mesh, ktorý má byť nahradený zrkadlom, vypočítame jeho obalový box, zistíme jeho rozmery a stred, a na základe toho vytvoríme nový objekt Reflector s rovnakou veľkosťou a umiestnením.
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
  });
}

// ANIMÁCIA KAMERY
let currentWaypointIndex = 0;
let animation = null;
function easeInOut(progress) {
  if (progress < 0.5) {
    return 2 * progress * progress;
  } else {
    return -1 + (4 - 2 * progress) * progress;
  }
}
// Funkcia na navigáciu na konkrétny waypoint, ktorá sa volá pri kliknutí na navigačné tlačidlá alebo orby.
// Zaistí načítanie správneho modelu, zobrazenie orbu a spustí animáciu kamery k cieľovému waypointu.
function navigateTo(index) {
  if (index < 0 || index >= CONFIG.waypoints.length) return;
  currentWaypointIndex = index;
  refreshNavigation();
  if (typeof closeMobileMenu === 'function') closeMobileMenu();
  const waypoint = CONFIG.waypoints[index];
  const currentPath = Object.keys(loadedModels).find(k => loadedModels[k] === activeModel);
  const modelToLoad = waypoint.targetModel || waypoint.model;
  if (modelToLoad && modelToLoad !== currentPath) {
    loadModel(modelToLoad, index, () => animateCamera(waypoint, false));
    return;
  }
  showOrbs(currentPath || waypoint.model);
  animateCamera(waypoint, true);
}
// Funkcia na nastavenie animácie kamery, ktorá sa volá po načítaní modelu alebo pri navigácií.
function animateCamera(waypoint, locked = false) {
  if (!waypoint.cam) return;
  let tx, ty, tz;
  if (!waypoint.tgt) {
    const forwardVector = new THREE.Vector3();
    camera.getWorldDirection(forwardVector).multiplyScalar(0.01);
    tx = waypoint.cam.x + forwardVector.x; ty = waypoint.cam.y + forwardVector.y; tz = waypoint.cam.z + forwardVector.z;
  } else if (interiorMode) {
    const forwardVector = new THREE.Vector3(waypoint.tgt.x - waypoint.cam.x, waypoint.tgt.y - waypoint.cam.y, waypoint.tgt.z - waypoint.cam.z).normalize().multiplyScalar(0.01);
    tx = waypoint.cam.x + forwardVector.x; ty = waypoint.cam.y + forwardVector.y; tz = waypoint.cam.z + forwardVector.z;
  } else {
    tx = waypoint.tgt.x; ty = waypoint.tgt.y; tz = waypoint.tgt.z;
  }
  animation = {
    from: { cx: camera.position.x, cy: camera.position.y, cz: camera.position.z,
            tx: controls.target.x,  ty: controls.target.y,  tz: controls.target.z },
    to:   { cx: waypoint.cam.x, cy: waypoint.cam.y, cz: waypoint.cam.z, tx, ty, tz },
    start: performance.now(),
    locked,
  };
}
// Funkcia na aktualizáciu pozície kamery počas animácie, ktorá sa volá v hlavnej animačnej slučke.
//  Vypočítava pokrok animácie, aplikuje easing a interpoluje poziciu kamery a cieľa.
function updateAnimation(now) {
  if (!animation) return;
  const progress = Math.min((now - animation.start) / 1400, 1);
  const eased = easeInOut(progress);
  const lerp = (a, b) => a + (b - a) * eased;
  camera.position.set(lerp(animation.from.cx, animation.to.cx), lerp(animation.from.cy, animation.to.cy), lerp(animation.from.cz, animation.to.cz));
  controls.target.set(lerp(animation.from.tx, animation.to.tx), lerp(animation.from.ty, animation.to.ty), lerp(animation.from.tz, animation.to.tz));
  if (progress >= 1) animation = null;
}

// KOLÍZIE
let buildingBounds = null;
let interiorMode = false;
// Funkcia na aktualizáciu hraníc pohybu kamery v exteriéri, ktorá sa volá v hlavnej animačnej slučke.
function updateBoundary() {
  if (!interiorMode && buildingBounds) {
    const distFromCenter = camera.position.distanceTo(buildingBounds.center);
    if (distFromCenter < buildingBounds.radius) {
      const direction = camera.position.clone().sub(buildingBounds.center).normalize();
      camera.position.copy(buildingBounds.center).addScaledVector(direction, buildingBounds.radius);
      zoomSpeed = 0;
    }
  }
}

// INFO ŠTÍTKY
const labelContainer = new THREE.Group();
scene.add(labelContainer);
// Funkcia na zalomeie textu do viac riadkov, ktorá sa volá při vytváraní textových štítkov, aby sa zaistilo, že text nepresiahne maximálnu šířku a zostane čitateľný.
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
function createLabel(label) {
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
  // Vytvoríme sprite s textúrou z canvasu a umiestnime ho do scény na pozícií určenou v konfigurácii.
  const sprite = new THREE.Sprite(new THREE.SpriteMaterial({
    map: new THREE.CanvasTexture(canvas),
    transparent: true,
    depthTest: true
  }));
  // Škálovanie štítku podľa konfigurácie a rozmerov canvasu, aby bol čitateľný a správne proporčný v 3D scéne.
  const scale = label.scale || 1;
  sprite.scale.set((canvasWidth / canvasHeight) * 0.5 * scale, 0.5 * scale, 1);
  sprite.position.set(label.pos.x, label.pos.y, label.pos.z);
  labelContainer.add(sprite);
}
// Funkcia na zobrazenie štítkov pre aktuálny model, ktorá sa volá po načítaní modelu a pri navigácií,
//  aby sa zobrazily iba štítky relevantné pre aktuálnu miestnosť.
function showLabels(modelPath) {
  clearGroup(labelContainer);
  (CONFIG.labels || []).forEach(label => { if (label.model === modelPath) createLabel(label); });
}

// ORB SYSTÉM
const orbContainer = new THREE.Group();
scene.add(orbContainer);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
// Funkcia na vytvorenie orbu pre určitý waypoint, ktorá sa volá pri zobrazení orbů pre aktuálny model.
function createOrb(waypoint, index, scale = 1) {
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
    label.position.y = 0.3 + (lines.length - 1) * 0.1;
    group.add(label);
  }
  group.userData = { waypointIndex: index, isOrb: true };
  group.scale.setScalar(scale);
  group.position.set(waypoint.orbPos.x, waypoint.orbPos.y, waypoint.orbPos.z);
  orbContainer.add(group);
}
// Funkcia na aktualizáciu animácie orbov, ktorá sa volá v hlavnej animačnej slučke, aby se orby jemne otáčaly a pulzovaly, čím přitahujú pozornost užívatela.
function updateOrbs(now) {
  const progress = now * 0.002;
  orbContainer.children.forEach((orb, i) => {
    const diamond = orb.children[0];
    if (diamond) diamond.rotation.y = progress + i;
    const ring = orb.children[1]; if (!ring) return;
    const scale = 1 + Math.sin(progress + i) * 0.12;
    ring.scale.set(scale, scale, scale);
    ring.material.opacity = 0.3 + Math.sin(progress + i) * 0.15;
  });
}
// Funkcia na zobrazenie orbov pre aktuálny model, ktorá sa volá po načítaní modelu a pri navigácií, aby sa zobrazily iba orby relevantne pre aktuálnu miestnosť a skryli sa orby pre aktuálnu pozíciu.
function showOrbs(modelPath) {
  clearGroup(orbContainer);
  CONFIG.waypoints.forEach((waypoint, i) => {
    if (!waypoint.orbPos || waypoint.model !== modelPath) return;
    if (!waypoint.targetModel && !waypoint.hideFromNav) return; // hlavný waypoint miestnosti
    if (i === currentWaypointIndex) return; // aktuálna pozícia - orb skry
    createOrb(waypoint, i, modelPath === 'Budova.glb' ? 3 : 1);
  });
}
// Funkcia na získanie orbu pod kurzorom myši alebo dotykom, ktorá se volá pri pohybe myši a pri dotyku, aby sa zistilo, či užívatel interaguje s orbom a umožnilo sa zvýraznenie a kliknutie na orby.
function getOrbAt(clientX, clientY) {
  mouse.x = (clientX / innerWidth) * 2 - 1;
  mouse.y = -(clientY / innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const hits = raycaster.intersectObjects(orbContainer.children, true);
  if (!hits.length) return null;
  let obj = hits[0].object;
  while (obj && !obj.userData.isOrb) obj = obj.parent;
  if (obj && obj.userData.isOrb) return obj;
  return null;
}

let hoveredOrb = null;
// Funkcia na zvýraznenie orbov pod kurzorom myši alebo dotykom, ktorá sa volá pri pohybe myši a pri dotyku, aby sa vizuálne odlíšil orb, na ktorý užívatel práve ukazuje a poskytol zpätnú väzbu o interaktivite orbov.
function highlightOrb(orb) {
  if (orb === hoveredOrb) return;
  if (hoveredOrb) hoveredOrb.children[0].material.color.setHex(0x0033cc);
  if (orb)        orb.children[0].material.color.setHex(0x4499ff);
  hoveredOrb = orb;
}

//  VSTUP - MYŠKA A DOTYK 
//  MYŠKA 
let clickStartPos = { x: 0, y: 0 };
let lastTouchTime = 0;
renderer.domElement.addEventListener('mousedown', event => {
  clickStartPos = { x: event.clientX, y: event.clientY };
  if (Date.now() - lastTouchTime > 400 && !(animation && animation.locked)) animation = null;
});
renderer.domElement.addEventListener('click', event => {
  if (Date.now() - lastTouchTime < 400) return;
  const dx = event.clientX - clickStartPos.x;
  const dy = event.clientY - clickStartPos.y;
  if (dx * dx + dy * dy > 25) return;
  const orb = getOrbAt(event.clientX, event.clientY);
  if (orb) navigateTo(orb.userData.waypointIndex);
});
let hoverPending = false;
renderer.domElement.addEventListener('mousemove', event => {
  if (hoverPending) return;
  hoverPending = true;
  const cx = event.clientX, cy = event.clientY;
  requestAnimationFrame(() => {
    hoverPending = false;
    highlightOrb(getOrbAt(cx, cy));
    renderer.domElement.style.cursor = hoveredOrb ? 'pointer' : 'default';
  });
});

//  DOTYK
let touchStart = { x: 0, y: 0 };
let pinchDistance = null;
let wasPinching = false;

renderer.domElement.addEventListener('touchstart', event => {
  if (!(animation && animation.locked)) animation = null;
  if (event.touches.length === 1) {
    const touch = event.touches[0];
    touchStart = { x: touch.clientX, y: touch.clientY };
    wasPinching = false;
    highlightOrb(getOrbAt(touch.clientX, touch.clientY));
  } else if (event.touches.length === 2) {
    wasPinching = true;
    highlightOrb(null);
    controls.enabled = false;
    const touch1 = event.touches[0], touch2 = event.touches[1];
    pinchDistance = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
  }
}, { passive: true });

renderer.domElement.addEventListener('touchmove', event => {
  if (event.touches.length !== 2 || pinchDistance === null) return;
  event.preventDefault();
  const touch1 = event.touches[0], touch2 = event.touches[1];
  const dist = Math.hypot(touch1.clientX - touch2.clientX, touch1.clientY - touch2.clientY);
  const delta = pinchDistance - dist;
  if (interiorMode) {
    camera.fov = Math.max(30, Math.min(90, camera.fov + delta * 0.06));
    camera.updateProjectionMatrix();
  } else {
    const camDist = camera.position.distanceTo(controls.target);
    const speed = Math.max(camDist * 0.08, 0.3);
    zoomSpeed += delta * 0.02 * speed;
  }
  pinchDistance = dist;
}, { passive: false });

renderer.domElement.addEventListener('touchend', event => {
  if (event.touches.length < 2) {
    pinchDistance = null;
    controls.enabled = true;
  }
  if (event.touches.length > 0) return;
  lastTouchTime = Date.now();
  highlightOrb(null);
  if (wasPinching) return;
  const touch = event.changedTouches[0];
  const dx = touch.clientX - touchStart.x;
  const dy = touch.clientY - touchStart.y;
  if (dx * dx + dy * dy > 25) return;
  const orb = getOrbAt(touch.clientX, touch.clientY);
  if (orb) navigateTo(orb.userData.waypointIndex);
}, { passive: true });

// NAVIGÁCIA UI 
function getActiveRoom() {
  const wp = CONFIG.waypoints[currentWaypointIndex];
  const activeModel = wp.targetModel || wp.model;
  return CONFIG.waypoints.find(w => w.model === activeModel && w.floor) || wp;
}
// Funkcia na aktualizáciu navigačného menu, ktorá sa volá po navigácií a pri načítaní scény, aby sa zvýraznila aktuálna pozícia v navigačnom menu a zobrazil sa názov a popis aktuálnej miestnosti.
function refreshNavigation() {
  const roomWp = getActiveRoom();
  const currentWp = CONFIG.waypoints[currentWaypointIndex];
  let label, sub;
  if (currentWp !== roomWp && (currentWp.desc || (!currentWp.targetModel && currentWp.name))) {
    label = currentWp.name || roomWp.name || '';
    sub = currentWp.desc || '';
  } else {
    label = roomWp.name || '';
    sub = roomWp.desc || '';
  }
  document.getElementById('waypoint-label').textContent = label;
  document.getElementById('waypoint-sub').textContent = sub;
  // Ak waypoint má floor a je skrytý (orb), použij jeho floor priamo — inak nájdi aktívnu miestnosť
  const isFloorOrb = currentWp.floor && currentWp.hideFromNav;
  let activeFloorId;
  let roomWpIndex;
  if (isFloorOrb) {
    activeFloorId = currentWp.floor;
    roomWpIndex = -1;
  } else {
    activeFloorId = roomWp.floor;
    roomWpIndex = CONFIG.waypoints.indexOf(roomWp);
  }

  // Aktualizácia stavu tlačidiel v hlavičke
  document.querySelectorAll('.room-btn').forEach(btn => {
    btn.classList.toggle('active', +btn.dataset.waypointIndex === roomWpIndex);
  });
  document.querySelectorAll('.floor-btn').forEach(btn => {
    const hasActive = !!btn.querySelector('.room-btn.active');
    const isFloorActive = activeFloorId === btn.dataset.floorId;
    btn.classList.toggle('active', hasActive || isFloorActive);
  });

  // Mobilný panel
  document.querySelectorAll('.mob-room-btn').forEach(btn => {
    btn.classList.toggle('active', +btn.dataset.waypointIndex === roomWpIndex);
  });
  document.querySelectorAll('.mob-floor-hdr').forEach(hdr => {
    const next = hdr.nextElementSibling;
    const hasActive = !!(next && next.querySelector('.mob-room-btn.active'));
    const isFloorActive = activeFloorId === hdr.dataset.floorId;
    hdr.classList.toggle('active', hasActive || isFloorActive);
  });
}

// Vytvorenie navigačného menu pre poschodia a miestnosti, ktorá sa volá pri načítaní scény, aby sa dynamicky vygenerovalo menu na základe konfigurácie a umožnilo užívatelom rýchlo sa posunúť do rôznych částí budovy.
const floorNav = document.getElementById('floor-nav');
// Funkcia na zavrenie otvorených dropdownov, ktorá sa volá pri kliknutí mimo navigačné menu, aby sa zaistilo, že všetky otvorené dropdowny budú zavrené a užívateľské rozhranie zostane prehľadné.
function closeDropdowns() {
  floorNav.querySelectorAll('.floor-btn').forEach(button => button.classList.remove('open'));
}
// Pre každé poschodie v konfigurácii vytvoríme tlačítko. Ak má poschodie viac miestností, pridáme dropdown s tlačítkami pre každú miestnosť.
// Kliknutím na tlačítko sa užívateľ naviguje na příslušný waypoint.
CONFIG.floors.forEach(floor => {
  const items = CONFIG.waypoints
    .map((wp, i) => ({ wp, i }))
    .filter(({ wp }) => wp.floor === floor.id && !wp.hideFromNav);
  if (!items.length) return;

  const btn = document.createElement('button');
  btn.className = 'floor-btn';
  btn.dataset.floorId = floor.id;

  if (items.length === 1) {
    btn.innerHTML = `<span>${floor.label}</span>`;
    btn.onclick = () => navigateTo(items[0].i);
  } else {
    const dropdown = document.createElement('div');
    dropdown.className = 'floor-dropdown';
    items.forEach(({ wp, i }) => {
      const roomBtn = document.createElement('button');
      roomBtn.className = 'room-btn';
      roomBtn.textContent = wp.name;
      roomBtn.dataset.waypointIndex = i;
      roomBtn.onclick = e => { e.stopPropagation(); navigateTo(i); closeDropdowns(); };
      dropdown.appendChild(roomBtn);
    });
    btn.innerHTML = `<span>${floor.label}</span><span class="chevron">▾</span>`;
    btn.appendChild(dropdown);
    btn.addEventListener('click', e => {
      if (e.target.closest('.floor-dropdown')) return;
      const isOpen = btn.classList.contains('open');
      closeDropdowns();
      if (!isOpen) btn.classList.add('open');
    });
  }

  floorNav.appendChild(btn);
});

document.addEventListener('click', e => {
  if (!e.target.closest('#floor-nav')) closeDropdowns();
});

//  MOBILNÝ HAMBURGER PANEL 
const mobileMenu = document.getElementById('mobile-menu');
const menuBtn    = document.getElementById('menu-btn');

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  menuBtn.textContent = '☰';
}

menuBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  if (isOpen) { closeMobileMenu(); }
  else { mobileMenu.classList.add('open'); menuBtn.textContent = '✕'; }
});

CONFIG.floors.forEach(floor => {
  const items = CONFIG.waypoints
    .map((wp, i) => ({ wp, i }))
    .filter(({ wp }) => wp.floor === floor.id && !wp.hideFromNav);
  if (!items.length) return;

  const section = document.createElement('div');
  section.className = 'mob-floor';

  const floorHeader = document.createElement('button');
  floorHeader.className = 'mob-floor-hdr';
  floorHeader.dataset.floorId = floor.id;

  const roomsDiv = document.createElement('div');
  roomsDiv.className = 'mob-rooms';

  if (items.length === 1) {
    floorHeader.innerHTML = `<span>${floor.label}</span>`;
    floorHeader.onclick = () => { navigateTo(items[0].i); closeMobileMenu(); };
  } else {
    floorHeader.innerHTML = `<span>${floor.label}</span><span class="chevron">▾</span>`;
    items.forEach(({ wp, i }) => {
      const roomButton = document.createElement('button');
      roomButton.className = 'mob-room-btn';
      roomButton.textContent = wp.name;
      roomButton.dataset.waypointIndex = i;
      roomButton.onclick = () => { navigateTo(i); closeMobileMenu(); };
      roomsDiv.appendChild(roomButton);
    });
    floorHeader.addEventListener('click', () => {
      const wasOpen = floorHeader.classList.contains('open');
      mobileMenu.querySelectorAll('.mob-floor-hdr').forEach(h => h.classList.remove('open'));
      if (!wasOpen) floorHeader.classList.add('open');
    });
  }

  section.appendChild(floorHeader);
  section.appendChild(roomsDiv);
  mobileMenu.appendChild(section);
});


//  NAČÍTANIE MODELOV 
function hideLoadingScreen() {
  document.getElementById('loading').classList.add('hidden');
}

const loadedModels = {};
let activeModel = null;
let activeLoadId = 0;

// Funkcia na načítanie 3D modelu pre konkrétny waypoint, ktorá sa volá pri navigácii na waypoint,
// ktorý vyžaduje načítanie iného modelu, aby sa zaistilo, že správný model bude načítaný a zobrazený pre danú miestnosť.
function loadModel(path, waypointIndex, onDone) {
  const waypoint = CONFIG.waypoints[waypointIndex];
  const loadId = ++activeLoadId;

  if (loadedModels[path]) {
    activateModel(loadedModels[path], path, waypoint, onDone);
    return;
  }

  setLoadingText('Načítavam ' + (waypoint.name || path) + '…');
  document.getElementById('loading').classList.remove('hidden');
  // Použijeme GLTFLoader s DRACO dekompresiou pre efektívne načítanie 3D modelov, a nastavíme callbacky pre úspešné načítanie, priebeh načítania a chyby, aby se správne zpracovalo načítanie modelu a zobrazily sa relevantné informácie užívateľovi.
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://unpkg.com/three@0.160.0/examples/jsm/libs/draco/');
  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  loader.load('Glb modely/' + path,
    gltf => {
      if (loadId !== activeLoadId) return;
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
      loadedModels[path] = gltf.scene;
      if (path === 'Tanecna.glb') replaceMirrorsInModel(gltf.scene);
      activateModel(gltf.scene, path, waypoint, onDone);
    },
    progress => { if (loadId !== activeLoadId) return; if (progress.total) setLoadingText((waypoint.name || path) + ': ' + Math.min(100, Math.round(progress.loaded / progress.total * 100)) + ' %'); },
    error => {
      if (loadId !== activeLoadId) return;
      const fullUrl = new URL(path, window.location.href).href;
      console.error('GLB nenajdeny:', fullUrl, error);
      let hint = '';
      if (window.location.protocol === 'file:') {
        hint = ' (otvor cez lokálny server, nie file://)';
      }
      setLoadingText(path + ' nenajdeny' + hint);
      setTimeout(() => {
        if (loadId !== activeLoadId) return;
        document.getElementById('loading').classList.add('hidden');
        if (onDone) onDone();
      }, 1500);
    }
  );
}
// Funkcia na načítanie počiatočného modelu, ktorá sa volá pri inicializácii scény, aby sa načítal a zobrazil první model a užívateľ mohol začať prezerať virtuálnu prehliadku.
function loadInitialModel(index, onDone) {
  const waypoint = CONFIG.waypoints[index];
  loadModel(waypoint.model, index, onDone);
}
// Funkcia na aktiváciu načítaného modelu, ktorá sa volá po úspěšnom načítaní modelu, aby sa odstranil predchádzajúci model ze scény,
// nastavilo sa správné osvetlenie a kamery pre interiér alebo exteriér a zobrazil sa nový model s príslušnými štítkami a orbami.
function activateModel(newScene, loadedPath, waypoint, onDone) {
  if (activeModel) {
    scene.remove(activeModel);
    const oldPath = Object.keys(loadedModels).find(k => loadedModels[k] === activeModel);
    if (oldPath && oldPath !== loadedPath) {
      delete loadedModels[oldPath];
      disposeModel(activeModel);
    }
  }
  activeModel = newScene;
  scene.add(activeModel);

  const isExterior = loadedPath === 'Budova.glb';
  interiorMode = !isExterior;

  // Kolízie — len exteriér (sféra okolo budovy)
  exteriorMeshes = [];
  if (interiorMode) {
    buildingBounds = null;
    camera.fov = 60;
    camera.updateProjectionMatrix();
  } else {
    const buildingBox = new THREE.Box3().setFromObject(newScene);
    buildingBounds = new THREE.Sphere();
    buildingBox.getBoundingSphere(buildingBounds);
    newScene.traverse(child => {
      if (child.isMesh) exteriorMeshes.push(child);
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
    controls.minDistance = 0.01;
    controls.maxDistance = 0.01;
    controls.enableZoom = false;
  }

  camera.position.set(waypoint.cam.x, waypoint.cam.y, waypoint.cam.z);
  if (!waypoint.tgt) {
    const forwardVector = new THREE.Vector3();
    camera.getWorldDirection(forwardVector).multiplyScalar(0.01);
    controls.target.set(waypoint.cam.x + forwardVector.x, waypoint.cam.y + forwardVector.y, waypoint.cam.z + forwardVector.z);
  } else if (interiorMode) {
    const forwardVector = new THREE.Vector3(waypoint.tgt.x - waypoint.cam.x, waypoint.tgt.y - waypoint.cam.y, waypoint.tgt.z - waypoint.cam.z).normalize().multiplyScalar(0.01);
    controls.target.set(waypoint.cam.x + forwardVector.x, waypoint.cam.y + forwardVector.y, waypoint.cam.z + forwardVector.z);
  } else {
    controls.target.set(waypoint.tgt.x, waypoint.tgt.y, waypoint.tgt.z);
  }

  controls.update();

  const center = box.getCenter(new THREE.Vector3());
  CONFIG.waypoints.filter(w => w.model === loadedPath && !w.orbPos).forEach(w => {
    w.orbPos = { x: center.x, y: box.min.y + 1.6, z: center.z };
  });

  showOrbs(loadedPath);
  showLabels(loadedPath);
  document.getElementById('loading').classList.add('hidden');
  if (onDone) onDone();
}

// HLAVNÁ SLUČKA A ŠTART 
(function animate(now) {
  requestAnimationFrame(animate);
  updateAnimation(now);
  updateZoom();
  updateBoundary();
  updateOrbs(now);
  controls.update();
  renderer.render(scene, camera);
})(0);

window.addEventListener('resize', () => {
  camera.aspect = innerWidth / innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight);
});

// Načítame počiatočný model a nastavíme prvú pozíciu kamery, aby si užívateľ mohol okamžite prehliadať virtuálnu prehliadku.
function poNacitani() {
  hideLoadingScreen();
  navigateTo(0);
}
loadInitialModel(0, poNacitani);
