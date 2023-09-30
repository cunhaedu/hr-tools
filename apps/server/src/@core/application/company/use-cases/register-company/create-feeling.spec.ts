// import { InMemoryFeelingRepository } from '@test/repositories/in-memory-feelings-repository';
// import { makeFeeling } from '@test/factories/feeling-factory';
// import { makeCompany } from '@test/factories/company-factory';

// import { CompanyExceedFeelingsLimit } from '../../errors/company-exceed-feelings-limit';
// import { CreateFeeling } from './create-company';

// describe('create feelings', () => {
//   it('should be able to create a feeling', async () => {
//     const feelingRepository = new InMemoryFeelingRepository();
//     const createFeeling = new CreateFeeling(feelingRepository);

//     const feeling = makeFeeling({ company: makeCompany({ id: 1 }) });

//     await createFeeling.execute(feeling);

//     const feelings = await feelingRepository.findManyByCompanyId(1);

//     expect(feelings).toHaveLength(1);
//   });

//   it('should not be able to create a feeling when company exceed the limit of 5 feelings', async () => {
//     const feelingRepository = new InMemoryFeelingRepository();
//     const createFeeling = new CreateFeeling(feelingRepository);

//     const feeling = makeFeeling({ company: makeCompany({ id: 1 }) });

//     await createFeeling.execute(feeling);
//     await createFeeling.execute(feeling);
//     await createFeeling.execute(feeling);
//     await createFeeling.execute(feeling);
//     await createFeeling.execute(feeling);

//     expect(() => {
//       return createFeeling.execute(feeling);
//     }).rejects.toThrow(CompanyExceedFeelingsLimit);
//   });
// });
