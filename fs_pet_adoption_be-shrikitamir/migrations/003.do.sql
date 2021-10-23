CREATE TABLE IF NOT EXISTS likes (
likePetId       INT NOT NULL,
likeUserId      INT NOT NULL,
FOREIGN KEY (likePetId) REFERENCES pets(petId),
FOREIGN KEY (likeUserId) REFERENCES users(userId)
);