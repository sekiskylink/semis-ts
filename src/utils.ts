import {FieldMapping, ProgramConfig} from "./interfaces";

export async function fetchData(filePath: string): Promise<any> {
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Failed to fetch data from ${filePath}`);
    }
    return response.json();
}

export function formatDateString(dateString: string): Date {
    return new Date(dateString);
}

export interface ExportTemplateProps {
    academicYearId: string
    orgUnit: string
    orgUnitName: string
    studentsNumber: string
    setLoadingExport?: any
}

/**
 * Transforms an array of key-value pairs into an object.
 * @param pairs - An array of key-value pairs where the key is a string and the value is of generic type T.
 * @returns An object composed of key-value pairs.
 * .
 * .
 * @example
 *  const entries: [string, any][] = [['a', 1], ['b', 2], ['c', 3]];
 *  const obj = fromPairs(entries);
 *  console.log(obj); // Output: { a: 1, b: 2, c: 3 }
 *  .
 *  * @template T - The type of the values in the key-value pairs, allowing for any data type
 */
export const fromPairs = <T>(pairs: Array<[string, T]>): Record<string, T> => {
    return pairs.reduce<Record<string, T>>((accumulator, [key, value]) => {
        accumulator[key] = value;
        return accumulator;
    }, {});
}

/**
 * getProgramTEAttributeID returns the id of a tracked entity attribute given its name
 * @param programConfig - the DHIS2 program configuration object
 * @param attribute the name of the tracked entity attribute
 * @return the id of the tracked entity attribute
 */
export const getProgramTEAttributeID = (programConfig: ProgramConfig, attribute: string): string => {
    const attr = programConfig?.programTrackedEntityAttributes.filter((v: any) => {
        return (v.trackedEntityAttribute.displayName === attribute)
    })
    if (attr?.length > 0) {
        return attr[0]?.trackedEntityAttribute?.id
    }
    return "";
}

/**
 * Generated a mapping for the field headers as in the template with their corresponding attributes as defined in
 * the DHIS2 program configuration.
 * @param programConfig - the program configuration
 * @param enrollmentProgramStages - the stages marked for student enrollment
 * @returns - the generated mapping for the field headers
 */
export const fieldsMap = (programConfig: ProgramConfig, enrollmentProgramStages: string[]): Record<string, FieldMapping> => {
    const stagesFieldsMapping = programConfig.programStages
        .filter(stage => enrollmentProgramStages.includes(stage.id))
        .map(p => {
            return p.programStageDataElements.map(de => {
                const mapping: FieldMapping = {
                    key: `${p.id}.${de.dataElement.id}`,
                    id: de.dataElement.id,
                    name: de.dataElement.displayName,
                    required: de.compulsory,
                    optionSetValue: de.dataElement.optionSetValue,
                    optionSet: de.dataElement.optionSet,
                    generated: false,
                    valueType: de.dataElement.valueType,
                    isTEAttribute: false
                }
                return mapping
            })
        })
    const fieldsMapping = stagesFieldsMapping
        .map(y => fromPairs(y.map(x => [x.key, x])))
        .reduce((accumulator, currentObj) => {
            return {...accumulator, ...currentObj}
        })
    // Let's add a mapping for the program Tracked entity attributes
    const _teiMap = programConfig.programTrackedEntityAttributes.map(te => {
        console.log()
        const mapping: FieldMapping = {
            key: `${te.trackedEntityAttribute.id}`,
            id: `${te.trackedEntityAttribute.id}`,
            name: te.trackedEntityAttribute.displayName,
            required: te.mandatory,
            optionSetValue: te.trackedEntityAttribute.optionSetValue,
            optionSet: te.trackedEntityAttribute.optionSet,
            generated: te.trackedEntityAttribute.generated,
            valueType: te.trackedEntityAttribute.valueType,
            isTEAttribute: true
        }
        return mapping
    })
    const teiMap = [_teiMap].map(y => fromPairs(y.map(x => [x.key, x])))
        .reduce((accumulator, currentObj) => {
            return {...accumulator, ...currentObj}
        })

    // Manually add ref, enrollmentDate & orgUnit, orgUnitName, system ID
    const uid: string = getProgramTEAttributeID(programConfig, "System ID")
    const systemIDTEAttributeID = uid.length > 0 ? uid : "G0B8B0AH5Ek"
    const extraMap: Record<string, FieldMapping> = {
        ref: {key: "ref", id: "ref", name: "ref", required: false, valueType: "TEXT", isTEAttribute: false},
        orgUnitName: {
            key: "orgUnitName",
            id: "orgUnitName",
            name: "orgUnitName",
            required: true,
            valueType: "TEXT",
            isTEAttribute: false
        },
        orgUnit: {
            key: "orgUnit",
            id: "orgUnit",
            name: "orgUnit",
            required: true,
            valueType: "ORGANISATION_UNIT",
            isTEAttribute: false
        },
        enrollmentDate: {
            key: "enrollmentDate",
            id: "enrollmentDate",
            name: "enrollmentDate",
            required: true,
            valueType: "DATE",
            isTEAttribute: false
        },
        trackedEntity: {
            key: "trackedEntity",
            id: "trackedEntity",
            name: "trackedEntity",
            required: false,
            valueType: "TEXT",
            isTEAttribute: false
        }
    }
    extraMap[systemIDTEAttributeID] = {
        key: systemIDTEAttributeID,
        id: systemIDTEAttributeID,
        name: "System ID",
        required: false,
        valueType: "TEXT",
        isTEAttribute: true
    }
    return {...fieldsMapping, ...extraMap, ...teiMap}
}
