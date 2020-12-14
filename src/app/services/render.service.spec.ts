import {TestBed, waitForAsync} from '@angular/core/testing';

import { RenderService } from './render.service';
import {getMockEnum, getMockStruct, getMockUnion} from './mock';

describe('RenderService', () => {
  let service: RenderService;
  let packageName = "helloProject"

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#renderEnum should return a C header', () => {
    service.renderEnum(getMockEnum()).subscribe(e => {
      expect(e).toBe("typedef enum position {\n" +
        "\tNORTH = 0,\n" +
        "\tSOUTH = 1,\n" +
        "} position;");
    })
  });

  it('#renderUnion should return a C header', () => {
    service.renderUnion(getMockUnion()).subscribe(e => {
      expect(e).toBe("typedef union position {\n" +
        "\tint* notPrecise;\n" +
        "\tfloat* precise;\n" +
        "} position;");
    })
    let union2 = getMockUnion();
    union2.attributes[0].isPointer = false;

    service.renderUnion(union2).subscribe(e => {
      expect(e).toBe(
        "typedef union position {\n" +
        "\tint notPrecise;\n" +
        "\tfloat* precise;\n" +
        "} position;");
    })
  });

  it('#renderStruct should return a C header', () => {
    service.renderStruct(getMockStruct()).subscribe(e => {
      expect(e).toBe("typedef struct position {\n" +
        "\tint* notPrecise;\n" +
        "\tfloat* precise;\n" +
        "} position;");
    })
    let struct2 = getMockStruct();
    struct2.isDisplayFunctionGenerated = true;
    struct2.attributes[0].isPointer = false;

    service.renderStruct(struct2).subscribe(e => {
      expect(e).toBe("// display function will be generated \n" +
        "typedef struct position {\n" +
        "\tint notPrecise;\n" +
        "\tfloat* precise;\n" +
        "} position;");
    })
  });

  it('#addHeader should return a C header', () => {
    service.addHeader(packageName);

    expect(service.finalRender.length).toBe(4);
    expect(service.finalRender[0]).toBe("#ifndef ");
    expect(service.finalRender[1]).toBe(packageName + "\n");
    expect(service.finalRender[2]).toBe("#define ");
    expect(service.finalRender[3]).toBe(packageName + "\n\n");
  });

  it('#addFooter should return a C footer', () => {
    service.addFooter(packageName);

    expect(service.finalRender.length).toBe(2);
    expect(service.finalRender[0]).toBe("#endif /* ");
    expect(service.finalRender[1]).toBe(packageName + " */\n");
  });

  it('#renderDataStructures should render all data structures', () => {
    service.renderDataStructures([getMockEnum()], [getMockUnion()], [getMockStruct()]);

    expect(service.finalRender.length).toBe(6);
  });

  it('#generate should render the final output', () => {
    let final = service.generate(packageName, [getMockEnum()], [getMockUnion()], [getMockStruct()]);

    expect(service.finalRender.length).toBe(12);
    expect(final).toBe(
      "#ifndef helloProject\n" +
      "#define helloProject\n" +
      "\n" +
      "typedef enum position {\n" +
      "\tNORTH = 0,\n" +
      "\tSOUTH = 1,\n" +
      "} position;\n" +
      "\n" +
      "typedef union position {\n" +
      "\tint* notPrecise;\n" +
      "\tfloat* precise;\n" +
      "} position;\n" +
      "\n" +
      "typedef struct position {\n" +
      "\tint* notPrecise;\n" +
      "\tfloat* precise;\n" +
      "} position;\n" +
      "\n" +
      "#endif /* helloProject */\n");
  });
});
