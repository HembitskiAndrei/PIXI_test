import {ParticleContainer} from "@pixi/particle-container";
import {Emitter} from "@pixi/particle-emitter";

export default class ExplodeParticles {
    constructor(app) {
        this.particleContainer = new ParticleContainer();
        this.particleContainer.visible = false;
        this.particleContainer.setProperties({
            scale: true,
            position: true,
            rotation: true,
            uvs: true,
            alpha: true,
        });
        app.stage.addChild(this.particleContainer);

        this._mainEmitter = new Emitter(
            this.particleContainer,
            {
                "lifetime": {
                    "min": 0.4,
                    "max": 0.7
                },
                "frequency": 0.003,
                "emitterLifetime": 0.25,
                "maxParticles": 2000,
                "addAtBack": false,
                "pos": {
                    "x": 0,
                    "y": 0
                },
                "behaviors": [
                    {
                        "type": "alpha",
                        "config": {
                            "alpha": {
                                "list": [
                                    {
                                        "time": 0,
                                        "value": 1
                                    },
                                    {
                                        "time": 0.25,
                                        "value": 1
                                    },
                                    {
                                        "time": 1,
                                        "value": 0.1
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "type": "moveSpeed",
                        "config": {
                            "speed": {
                                "list": [
                                    {
                                        "time": 0,
                                        "value": 350
                                    },
                                    {
                                        "time": 0.75,
                                        "value": 50
                                    },
                                    {
                                        "time": 1,
                                        "value": 300
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "type": "scale",
                        "config": {
                            "scale": {
                                "list": [
                                    {
                                        "time": 0,
                                        "value": 0.1
                                    },
                                    {
                                        "time": 0.5,
                                        "value": 1.0
                                    },
                                    {
                                        "time": 1,
                                        "value": 0.1
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
                                        "value": "#ffab3a"
                                    },
                                    {
                                        "time": 0.5,
                                        "value": "#ff3d23"
                                    },
                                    {
                                        "time": 1,
                                        "value": "#ff6123"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "type": "rotationStatic",
                        "config": {
                            "min": 0,
                            "max": 360
                        }
                    },
                    {
                        "type": "textureRandom",
                        "config": {
                            "textures": [
                                "./src/assets/textures/particle.png",
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
                                "radius": 10,
                                "innerRadius": 3,
                                "affectRotation": true
                            }
                        }
                    }
                ]
            }
        );

        this._sparkEmitter = new Emitter(
            this.particleContainer,
            {
                "lifetime": {
                    "min": 0.4,
                    "max": 0.7
                },
                "frequency": 0.008,
                "emitterLifetime": 0.15,
                "maxParticles": 1000,
                "addAtBack": false,
                "pos": {
                    "x": 0,
                    "y": 0
                },
                "behaviors": [
                    {
                        "type": "alpha",
                        "config": {
                            "alpha": {
                                "list": [
                                    {
                                        "time": 0,
                                        "value": 1
                                    },
                                    {
                                        "time": 0.25,
                                        "value": 1
                                    },
                                    {
                                        "time": 1,
                                        "value": 0.1
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "type": "moveSpeed",
                        "config": {
                            "speed": {
                                "list": [
                                    {
                                        "time": 0,
                                        "value": 500
                                    },
                                    {
                                        "time": 0.75,
                                        "value": 150
                                    },
                                    {
                                        "time": 1,
                                        "value": 300
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "type": "scale",
                        "config": {
                            "scale": {
                                "list": [
                                    {
                                        "time": 0,
                                        "value": 0.1
                                    },
                                    {
                                        "time": 0.5,
                                        "value": 0.1
                                    },
                                    {
                                        "time": 1,
                                        "value": 0.1
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
                                        "value": "#ffe2d1"
                                    },
                                    {
                                        "time": 0.25,
                                        "value": "#ff762e"
                                    },
                                    {
                                        "time": 1,
                                        "value": "#712100"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "type": "rotationStatic",
                        "config": {
                            "min": 0,
                            "max": 360
                        }
                    },
                    {
                        "type": "textureRandom",
                        "config": {
                            "textures": [
                                "./src/assets/textures/spark.png"
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
                                "radius": 10,
                                "innerRadius": 3,
                                "affectRotation": true
                            }
                        }
                    }
                ]
            }
        );

        this._stoneEmitter = new Emitter(
            this.particleContainer,
            {
                "lifetime": {
                    "min": 0.5,
                    "max": 1.0
                },
                "frequency": 0.003,
                "emitterLifetime": 0.25,
                "maxParticles": 250,
                "addAtBack": false,
                "pos": {
                    "x": 0,
                    "y": 0
                },
                "behaviors": [
                    {
                        "type": "alpha",
                        "config": {
                            "alpha": {
                                "list": [
                                    {
                                        "time": 0,
                                        "value": 1
                                    },
                                    {
                                        "time": 0.25,
                                        "value": 1
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
                        "type": "moveSpeed",
                        "config": {
                            "speed": {
                                "list": [
                                    {
                                        "time": 0,
                                        "value": 350
                                    },
                                    {
                                        "time": 0.25,
                                        "value": 200
                                    },
                                    {
                                        "time": 1,
                                        "value": 10
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "type": "scale",
                        "config": {
                            "scale": {
                                "list": [
                                    {
                                        "time": 0,
                                        "value": 0.1
                                    },
                                    {
                                        "time": 0.25,
                                        "value": 1.0
                                    },
                                    {
                                        "time": 1,
                                        "value": 1.2
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
                                        "value": "#3b2e29"
                                    },
                                    {
                                        "time": 0.25,
                                        "value": "#5a472a"
                                    },
                                    {
                                        "time": 1,
                                        "value": "#341500"
                                    }
                                ]
                            }
                        }
                    },
                    {
                        "type": "rotationStatic",
                        "config": {
                            "min": 0,
                            "max": 360
                        }
                    },
                    {
                        "type": "textureRandom",
                        "config": {
                            "textures": [
                                "./src/assets/textures/particle.png",
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
                                "radius": 10,
                                "innerRadius": 3,
                                "affectRotation": true
                            }
                        }
                    }
                ]
            }
        );
    }

    Update(delta) {
        this._mainEmitter.update(delta);
        this._sparkEmitter.update(delta);
        this._stoneEmitter.update(delta);
    }

    Start(x, y) {
        this.particleContainer.visible = true;

        this._mainEmitter.emit = true;
        this._mainEmitter.resetPositionTracking();
        this._mainEmitter.updateOwnerPos(x, y);

        this._sparkEmitter.emit = true;
        this._sparkEmitter.resetPositionTracking();
        this._sparkEmitter.updateOwnerPos(x, y);

        this._stoneEmitter.emit = true;
        this._stoneEmitter.resetPositionTracking();
        this._stoneEmitter.updateOwnerPos(x, y);
    }
}