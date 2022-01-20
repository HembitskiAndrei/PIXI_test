import {ParticleContainer} from "@pixi/particle-container";
import {Emitter} from "@pixi/particle-emitter";

export default class RocketFlame {
    constructor() {
        const particleContainer = new ParticleContainer();
        particleContainer.setProperties({
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true,
        });

        this._mainEmitter = new Emitter(
            particleContainer,
            {
                "lifetime": {
                    "min": 0.1,
                    "max": 0.2
                },
                "frequency": 0.001,
                "emitterLifetime": 0,
                "maxParticles": 1000,
                "addAtBack": true,
                "pos": {
                    "x": 640,
                    "y": 665
                },
                "behaviors": [
                    {
                        "type": "alpha",
                        "config": {
                            "alpha": {
                                "list": [
                                    {
                                        "time": 0,
                                        "value": 0
                                    },
                                    {
                                        "time": 0.5,
                                        "value": 0.62
                                    },
                                    {
                                        "time": 1,
                                        "value": 0
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "type": "moveSpeedStatic",
                        "config": {
                            "min": -400,
                            "max": -400
                        }
                    },
                    {
                        "type": "scale",
                        "config": {
                            "scale": {
                                "list": [
                                    {
                                        "time": 0,
                                        "value": 0.2
                                    },
                                    {
                                        "time": 1,
                                        "value": 0.5
                                    }
                                ]
                            },
                            "minMult": 1
                        }
                    },
                    {
                        "type": "color",
                        "config": {
                            "color": {
                                "list": [
                                    {
                                        "time": 0,
                                        "value": "#ffead5"
                                    },
                                    {
                                        "time": 0.25,
                                        "value": "#ffe7aa"
                                    },
                                    {
                                        "time": 1,
                                        "value": "#ff4100"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "type": "rotation",
                        "config": {
                            "accel": 0,
                            "minSpeed": 50,
                            "maxSpeed": 50,
                            "minStart": 265,
                            "maxStart": 275
                        }
                    },
                    {
                        "type": "textureRandom",
                        "config": {
                            "textures": [
                                "./src/assets/textures/particle.png",
                                "./src/assets/textures/fire.png",
                            ]
                        }
                    },
                    {
                        "type": "spawnShape",
                        "config": {
                            "type": "torus",
                            "data": {
                                "x": 0,
                                "y": 0,
                                "radius": 17,
                                "innerRadius": 0,
                                "affectRotation": false
                            }
                        }
                    }
                ]
            }
        );
    }

    SetParent(container) {
        this._mainEmitter.parent = container;
    }

    Update(delta) {
        this._mainEmitter.update(delta);
    }
}