const {
    initializeApp
} = require('firebase-admin/app');
const {
    getFirestore
} = require('firebase-admin/firestore');
const {
    Storage
} = require('@google-cloud/storage');

initializeApp();
const db = getFirestore();
const userDb = db.collection("user")
const gameDb = db.collection("game")
const scanDb = db.collection("scan")

const storage = new Storage();
const bucketName = process.env.BUCKET_NAME


exports.insertScanUser = async (scanerId, userId) => {

    let scanDocument = scanDb.where("scanerId", "==", scanerId).where("userId", "==", userId)
    let scanCount = await scanDocument.count().get()
    if (scanCount.data().count === 0) {
        await scanDb.add({
            userId: userId,
            scanerId: scanerId,
            createAt: Date.now()
        })
    }
    return true

}

exports.countScanUser = async (scanerId, userId) => {
    let scanDocument = scanDb.where("scanerId", "==", scanerId).where("userId", "==", userId)
    let scanCount = await scanDocument.count().get()
    return scanCount.data().count
}

exports.insertUser = async (profile) => {

    let userDocument = userDb.where("userId", "==", profile.userId)
    let userCount = await userDocument.count().get()
    if (userCount.data().count === 0) {
        // profile.displayName = profile.displayName + "_" + userCount.data().count
        await userDb.add({
            userId: profile.userId,
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
            status: "active",
            point: 0,
            createAt: Date.now()
        })
    }
    return profile

}


exports.update = async (userId, point) => {
    try {
        const querySnapshot = await userDb
            .where("userId", "==", userId)
            .get();
        for (const doc of querySnapshot.docs) {
            await userDb.doc(doc.id).update({
                point: point,
            });
            return true;

        }
    } catch (error) {
        return false;
    }
};

/*  count user by groupId */
exports.countUserGroup = async (groupId) => {
    let userDocument = userDb.where("groupId", "==", groupId)
    let userCount = await userDocument.count().get()
    return userCount.data().count
}

/*  delete Member by userId and  groupId */
exports.deleteUserGroup = async (userId, groupId) => {
    const userDocument = userDb.where("groupId", "==", groupId).where("userId", "==", userId)
    await userDocument.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
    });

    return true

}

/*  delete Group by groupId */
exports.deleteGroup = async (groupId) => {
    const userDoc = userDb.doc(groupId);
    const docSnapshot = await userDoc.get();
    if (docSnapshot.exists) {
        await userDoc.delete();
    }
    return true
}


exports.getUser = async () => {
    let arrayUser = []
    const userDocument = await userDb.where("status", "==", "active").get()
    let userCount = await userDb.where("status", "==", "active").count().get()
    if (userCount.data().count > 1) {
        userDocument.forEach((doc) => {
            arrayUser.push(doc.data())
        });
    }
    return (arrayUser.length > 1) ? arrayUser : false
}

exports.getUserByUserId = async (userId) => {
    try {
        const querySnapshot = await userDb
            .where('userId', '==', userId)
            .get();
        for (const doc of querySnapshot.docs) {
            return doc.data();
        }
    } catch (error) {
        return false;
    }
};
exports.getGameByUserId = async () => {
    try {
        let groupUser = []
        const gameDocument = await gameDb.get();
        gameDocument.forEach((doc) => {
            groupUser.push(doc.data())
        });
        return (groupUser.length > 0) ? groupUser : false
    } catch (error) {
        return false;
    }
};


exports.updateGameGroup = async (data) => {
    const gameDocRef = gameDb.doc(data.groupId);
    const gameDocument = await gameDocRef.get();
    if (gameDocument.exists) {
        await gameDocRef.update(data);
    } else {
        await gameDocRef.set(data);
    }

    return data
}

exports.saveImageToStorage = async (userId, buffer, extension) => {
    const storageBucket = storage.bucket(bucketName);
    const file = storageBucket.file(`${userId}.${extension}`);
    await file.save(buffer);
    file.makePublic()
    return file.publicUrl()
};