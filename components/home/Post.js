import { Image, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import React, { useState, useEffect } from "react";
import { Divider } from "react-native-elements";
import PostHeader from "./PostHeader";
import { firebase, db } from "../../firebase";

const postFooterIcons = [
  {
    name: "Like",
    image: "like.png",
    likedImage: "liked.png",
  },
  {
    name: "Comment",
    image: "comment.png",
  },
  {
    name: "Share",
    image: "share.png",
  },
  {
    name: "Save",
    image: "save.png",
  },
];

const imageMap = {
  "like.png": require("../../assets/like.png"),
  "liked.png": require("../../assets/liked.png"),
  "comment.png": require("../../assets/comment.png"),
  "share.png": require("../../assets/share.png"),
  "save.png": require("../../assets/save.png"),
};

const Post = ({ post }) => {
  const handleLike = (post) => {
    const currentLikeStatus = !post.likes_by_users.includes(
      firebase.auth().currentUser.email
    );

    db.collection("users")
      .doc(post.owner_email)
      .collection("posts")
      .doc(post.id)
      .update({
        likes_by_users: currentLikeStatus
          ? firebase.firestore.FieldValue.arrayUnion(
              firebase.auth().currentUser.email
            )
          : firebase.firestore.FieldValue.arrayRemove(
              firebase.auth().currentUser.email
            ),
      })

      .then(() => {
        console.log("✅ Document successfully updated!");
      })
      .catch((error) => {
        console.error("❌ Error updating document: ", error);
      });
  };

  if (!post) {
    return null;
  }

  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter post={post} handleLike={handleLike} />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  );
};

const PostImage = ({ post }) => (
  <View
    style={{
      width: "100%",
      height: 450,
    }}
  >
    <Image
      source={{ uri: post.imageUrl }}
      style={{ height: "100%", resizeMode: "cover" }}
    />
  </View>
);

const Icon = ({ imgStyle, imgUrl }) => (
  <TouchableOpacity>
    <Image style={imgStyle} source={imageMap[imgUrl]} />
  </TouchableOpacity>
);

const PostFooter = ({ handleLike, post }) => {
  const iconStyles = styles.footerIcon;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", marginRight: 10 }}>
        <TouchableOpacity onPress={() => handleLike(post)}>
          <Image
            style={styles.footerIcon}
            source={
              imageMap[
                post.likes_by_users.includes(firebase.auth().currentUser.email)
                  ? postFooterIcons[0].likedImage
                  : postFooterIcons[0].image
              ]
            }
          />
        </TouchableOpacity>
        <View style={{ marginLeft: 10 }}>
          <Icon
            imgStyle={styles.footerIcon}
            imgUrl={postFooterIcons[1].image}
          />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Icon
            imgStyle={styles.footerIcon}
            imgUrl={postFooterIcons[2].image}
          />
        </View>
      </View>
      <Icon imgStyle={iconStyles} imgUrl={postFooterIcons[3].image} />
    </View>
  );
};

const Likes = ({ post }) => (
  <View style={{ flexDirection: "row", marginTop: 4 }}>
    <Text style={{ color: "white", fontWeight: "600" }}>
      {post.likes_by_users.length.toLocaleString("en")} likes
    </Text>
  </View>
);

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: "white" }}>
      <Text style={{ fontWeight: "600", marginLeft: 5 }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>
);

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: "gray" }}>
        View{post.comments.length > 1 ? " all" : ""} {post.comments.length}{" "}
        {post.comments.length > 1 ? "comments" : "comment"}
      </Text>
    )}
  </View>
);

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: "row", marginTop: 5 }}>
        <Text style={{ color: "white" }}>
          <Text style={{ fontWeight: "600" }}>{comment.user}</Text>{" "}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
);

const styles = StyleSheet.create({
  footerIcon: {
    width: 33,
    height: 33,
  },
});

export default Post;
