import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestModuleMetadata } from '@angular/core/testing';

import { AppMocksCoreModule } from '../client-unit-testing.module';

/**
 * New TestBed metadata getter type.
 */
export type TNewTestBedMetadata = (metadata?: TestModuleMetadata) => TestModuleMetadata;
/**
 * New TestBed metadata getter.
 * Should be used to provide additional metadata to default test bed config.
 * Provide a result as a parameter to getTestBedConfig method.
 */
export const newTestBedMetadata: TNewTestBedMetadata = (metadata?: TestModuleMetadata) => {
  const imports = [...(metadata?.imports ?? [])];
  const declarations = [...(metadata?.declarations ?? [])];
  const providers = [...(metadata?.providers ?? [])];
  const schemas = [...(metadata?.schemas ?? [])];
  return {
    imports,
    declarations,
    providers,
    schemas,
  };
};

/**
 * TestBed config getter type.
 */
export type TTestBedConfigGetter = (metadata: TestModuleMetadata) => TestModuleMetadata;
/**
 * TestBed configuration getter.
 * @param metadata additional test bed metadata
 */
export const getTestBedConfig: TTestBedConfigGetter = (metadata: TestModuleMetadata = newTestBedMetadata()) =>
  new Object({
    declarations: [...(metadata?.declarations ?? [])],
    imports: [AppMocksCoreModule.forRoot(), ...(metadata?.imports ?? [])],
    providers: [...(metadata?.providers ?? [])],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, ...(metadata?.schemas ?? [])],
  });
