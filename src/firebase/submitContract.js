import { rtDatabase, db as fsDatabase } from './config';
import { ref as sRef, set as sSet } from 'firebase/database';
import { doc as fDoc, setDoc as fSet } from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export function addContract(contractData) {
    console.log('Adding contract');
    const contractId = "task-" + uuidv4();
    const contractsRef = sRef(rtDatabase, 'messages/' + contractId);
    const contractDoc = fDoc(fsDatabase, 'contracts/' + contractId);

    return Promise.all([
        sSet(contractsRef, contractData),
        fSet(contractDoc, contractData)
    ]).then(() => {
        console.log('Contract added', contractId);
        return contractId;
    }).catch((error) => {
        console.log('Error adding contract: ', error);
        throw error;
    });
}