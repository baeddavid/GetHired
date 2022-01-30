import { useParams, useLocation } from "react-router-dom";
import EditJob from "./EditJob.component";

export default function EditJobHook() {
    const { jobId } = useParams();
    const location = useLocation();
    console.log(location.state);
    return <EditJob
        jobId={jobId}
        jobListingName={location.state.jobListingName}
        link={location.state.link}
        company={location.state.company}
        referral={location.state.referral}
        status={location.state.status}
        tags={location.state.tags}
    />
}