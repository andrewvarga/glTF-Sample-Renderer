class gltfPrimitive
{
    constructor(attributes = new Map(), indices = undefined, material = undefined, mode = gl.TRIANGLES)
    {
        this.attributes = attributes;
        this.indices = indices;
        this.material = material;
        this.mode = mode;
        this.defines = [];
        this.skip = true;
    }

    fromJson(jsonPrimitive)
    {
        fromKeys(this, jsonPrimitive);

        // https://github.com/KhronosGroup/glTF/blob/master/specification/2.0/README.md#meshes
        for(let attrib in this.attributes)
        {
            switch (attrib) {
                case "POSITION":
                    this.skip = false;
                    //this.defines.push("HAS_VERTEX_POSITION"); // should be mandatory
                    break;
                case "NORMAL":
                    this.defines.push("HAS_NORMALS");
                    break;
                case "TANGENT":
                    this.defines.push("HAS_TANGENTS");
                    break;
                case "TEXCOORD_0":
                    this.defines.push("HAS_UV_SET1");
                    break;
                case "TEXCOORD_1":
                    this.defines.push("HAS_UV_SET2");
                    break;
                case "COLOR_0":
                    this.defines.push("HAS_VERTEX_COLOR");
                    break;
                case "JOINTS_0":
                    this.defines.push("HAS_JOINTS");
                    break;
                case "WEIGHTS_0":
                    this.defines.push("HAS_WEIGHTS");
                    break;
                default:
                    console.log("Unknown attrib: " + attrib);
            }
        }
    }

    getShaderIdentifier()
    {
        return "primitive.vert";
    }

    getDefines()
    {
        return this.defines;
    }
};
