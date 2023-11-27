import React from "react";
import {
    Grid,
} from "@material-ui/core";
import { useMediaQuery, useTheme } from "@material-ui/core";
import { Story } from "../../models/Story";
import StoryComponent from "../Story/StoryComponent";
import { styles } from "./discoverStories.css"

interface InputProps {
    stories: Story[];
}

export default function DiscoverStories({ stories }: InputProps) {
    const s = styles();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
    const isMedium = useMediaQuery(theme.breakpoints.between("sm", "md"));

    const oddStories = stories?.filter((_, index) => index % 2 === 0);
    const evenStories = stories?.filter((_, index) => index % 2 !== 0);

    const firstList = [];
    const secondList = [];
    const thirdList = [];
    const fourthList = [];

    stories?.forEach((story, index) => {
        if (index % 4 === 0) {
            firstList.push(story);
        } else if (index % 4 === 1) {
            secondList.push(story);
        } else if (index % 4 === 2) {
            thirdList.push(story);
        } else {
            fourthList.push(story);
        }
    });

    return (
        <Grid container justifyContent="center" spacing={2}>
            {isMobile && (
                <Grid item xs={12}>
                    {stories?.map((story: Story) => (
                        <StoryComponent isIndex={true} story={story} key={story.Id} />
                    ))}
                </Grid>
            )}
            {isMedium && (
                <>
                    <Grid item className={s.grid}>
                        {oddStories?.map((story: Story) => (
                            <StoryComponent isIndex={true} story={story} key={story.Id} />
                        ))}
                    </Grid>
                    <Grid item className={s.lastGrid}>
                        {evenStories?.map((story: Story) => (
                            <StoryComponent isIndex={true} story={story} key={story.Id} />
                        ))}
                    </Grid>
                </>
            )}
            {!isMobile && !isMedium && (
                <>
                    <Grid item className={s.grid}>
                        {firstList?.map((story: Story) => (
                            <StoryComponent isIndex={true} story={story} key={story.Id} />
                        ))}
                    </Grid>
                    <Grid item className={s.grid}>
                        {secondList?.map((story: Story) => (
                            <StoryComponent isIndex={true} story={story} key={story.Id} />
                        ))}
                    </Grid>
                    <Grid item className={s.grid}>
                        {thirdList?.map((story: Story) => (
                            <StoryComponent isIndex={true} story={story} key={story.Id} />
                        ))}
                    </Grid>
                    <Grid item className={s.lastGrid}>
                        {fourthList?.map((story: Story) => (
                            <StoryComponent isIndex={true} story={story} key={story.Id} />
                        ))}
                    </Grid>
                </>
            )}
        </Grid>
    );
}

