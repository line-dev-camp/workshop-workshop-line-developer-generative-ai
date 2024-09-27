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
const imagesDb = db.collection("images")
const gameDb = db.collection("game")
const answersDB = db.collection("answers");

const storage = new Storage();
const bucketName = process.env.BUCKET_NAME

/* Insert Member by userId and groupId */
exports.insertUserGroup = async (groupId, profile) => {

    let userDocument = userDb.where("groupId", "==", groupId).where("userId", "==", profile.userId)
    let userCount = await userDocument.count().get()
    if (userCount.data().count === 0) {
        await userDb.add({
            userId: profile.userId,
            displayName: profile.displayName,
            pictureUrl: profile.pictureUrl,
            groupId: groupId,
            createAt: Date.now()
        })
  
    }

    return profile

}

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


/*  Get User Lists by groupId */
exports.getUserGroup = async (groupId) => {
  let arrayUser = []
  const userDocument = await userDb.where("groupId", "==", groupId).get()
  let userCount = await userDb.where("groupId", "==", groupId).count().get()
  if (userCount.data().count > 1) {
      userDocument.forEach((doc) => {
          arrayUser.push(doc.data())
      });
  }
  return (arrayUser.length > 1) ? arrayUser : false
}


/* Save image to cloud storage */
exports.saveImageToStorage = async (id, messageId, buffer, extension) => {
    const storageBucket = storage.bucket(bucketName);
    const file = storageBucket.file(`${id}/${messageId}.${extension}`);
    await file.save(buffer);
    file.makePublic()
    return file.publicUrl()
};

/* Get extension by messageType */
exports.getExtension = (fileName, messageType) => {
    let extension = '';
    switch (messageType) {
        case "image":
            extension = 'png';
            break;
        case "video":
            extension = 'mp4';
            break;
        case "audio":
            extension = 'm4a';
            break;
        case "file":
            const regex = /\.([0-9a-z]+)(?:[\?#]|$)/i;
            const match = regex.exec(fileName);
            extension = match ? match[1] : '';
            break;
    }

    return extension

}

/* Insert publicUrl by groupId */
exports.insertImageGroup = async (groupId, messageId, publicUrl) => {
    const date = new Date().toLocaleDateString('en-CA', {
        timeZone: 'Asia/Bangkok',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    }).replace(/\//g, '-');
    await imagesDb.add({
        groupId: groupId,
        messageId: messageId,
        publicUrl: publicUrl,
        date: date
    })
}

/*  delete Group by groupId */
exports.deleteGroupImages = async (groupId) => {
    const imageDocument = imagesDb.where("groupId", "==", groupId)
    await imageDocument.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
    });
    return true
}


/* vvv Game เป่ายิ่งฉุบ */

exports.createGame = async (userId, groupId) => {

    const gameDocument = gameDb.where("groupId", "==", groupId).where("userId", "==", userId)
    const gameCount = await gameDocument.count().get()
    if (gameCount.data().count === 0) {
        const result = await gameDb.add({
            ownerId: userId, // userID ผู้สร้างเกม
            groupId: groupId, // line group id
            ownerSelect: false, // defualt ค่าเป็น false สำหรับเลือก ค้อน กรรไกร กระดาษ
            endgame: false, // สถานะจบเกม
            users: [], // user ผู้เข้าร่วม
            createAt: Date.now() // เวลาสร้างเกม
        })
        return result.id
    }
    return false

}


exports.deleteGameGroup = async (groupId) => {
    const gameDocument = gameDb.where("groupId", "==", groupId)
    await gameDocument.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
    });

}

exports.deleteGameUserId = async (groupId, userId) => {

    let gameDocument = gameDb.where("groupId", "==", groupId).where('ownerId', '==', userId)
    await gameDocument.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            doc.ref.delete();
        });
    });

}

exports.endGame = async (groupId, userId) => {

    try {

        const gameDocument = gameDb.where('groupId', '==', groupId)
            .where('ownerId', '==', userId)
            .where('endgame', '==', false)
        const gameCount = await gameDocument.count().get()
        // return gameCount.data().count
        if (gameCount.data().count > 0) {
            const querySnapshot = await gameDocument.get();
            for (const doc of querySnapshot.docs) {
                await gameDb.doc(doc.id).update({
                    endgame: true,
                });
                return true;
            }
        } else {
            return false;
        }

    } catch (error) {
        return false;
    }

}

exports.updateInsertOwnerSelect = async (groupId, gameId, item, userId) => {
    try {
        const querySnapshot = await gameDb
            .where('groupId', '==', groupId)
            .where('endgame', '==', false)
            .get();
        for (const doc of querySnapshot.docs) {
            if (userId === doc.data().ownerId) {
                if (doc.id === gameId && !doc.data().ownerSelect) {
                    await gameDb.doc(doc.id).update({
                        ownerSelect: item,
                    });
                    return "done";
                } else {
                    return "selected";
                }
            } else {
                return false;
            }

        }
    } catch (error) {
        return false;
    }
};

exports.getUserByGame = async (groupId, gameId, userId) => {
    try {
        const querySnapshot = await gameDb
            .where('groupId', '==', groupId)
            .where('ownerId', '==', userId)
            .where('endgame', '==', true)
            .get();
        for (const doc of querySnapshot.docs) {
            if (doc.id === gameId) {
                return doc.data();
            }
        }
    } catch (error) {
        return false;
    }
};

exports.updateInsertJoinerSelect = async (groupId, gameId, item, userId) => {
    try {
        const querySnapshot = await gameDb
            .where('groupId', '==', groupId)
            .where('endgame', '==', false)
            .get();
        for (const doc of querySnapshot.docs) {

            if (doc.id === gameId && doc.data().ownerId !== userId) {
                let userlistItem = doc.data().users
                const dataLength = Object.keys(userlistItem).length;

                let arrayData = userlistItem
                if (dataLength > 0) {
                    let memberList = []
                    for (const [index, userObject] of userlistItem.entries()) {
                        let memberId = Object.keys(userObject)[0];
                        memberList.push(memberId)
                    }
                    const hasValue = memberList.some(e => e === userId);
                    if (!hasValue) {
                        const newData = {
                            [userId]: item,
                        };
                        arrayData.push(newData)
                        await gameDb.doc(doc.id).update({
                            users: arrayData,
                        });
                        return true;
                    } else {
                        return false;
                    }

                } else {

                    const newData = {
                        [userId]: item,
                    };
                    arrayData.push(newData)
                    await gameDb.doc(doc.id).update({
                        users: arrayData,
                    });

                    return true;
                }

            }

            return false;
        }
    } catch (error) {
        return false;
    }
};

exports.getCountGameGroupStatus = async (groupId, status) => {
    const gameDocument = gameDb.where("groupId", "==", groupId).where('endgame', '==', status)
    const gameCount = await gameDocument.count().get()
    return gameCount.data().count
}

exports.getCheckGameGroupStatus = async (groupId, gameId) => {
    const querySnapshot = await gameDb
        .where('groupId', '==', groupId)
        .where('endgame', '==', false)
        .get();

    const gameDocument = gameDb.where('groupId', '==', groupId)
        .where('endgame', '==', false)
    const gameCount = await gameDocument.count().get()
    if (gameCount.data().count > 0) {
        for (const doc of querySnapshot.docs) {
            if (doc.id === gameId) {
                return true;
            } else {
                return false;
            }

        }
    } else {
        return false;
    }
}

/* ^^^ Game เป่ายิ่งฉุบ */


/* vvv Game DISC */


exports.insertUserAnswer = async (data) => {
  const userDocRef = answersDB.doc(data.userId);
  const userDocument = await userDocRef.get();
  if (userDocument.exists) {
    await userDocRef.update(data);
  } else {
    await userDocRef.set(data);
  }

  return data
}
exports.getUserAnswer = async (userId) => {
  const userDocument = await answersDB.doc(userId).get()
  return userDocument.exists ? userDocument.data() : false;
}

/* ^^^ Game DISC */
