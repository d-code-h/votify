import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/voters.module.css';

export default function Voters() {
  const router = useRouter();
  const [msg, setmsg] = useState('Loading...');
  const [position, setposition] = useState('Most Influential');
  const [candidates, setcandidates] = useState([]);
  const [voted, setvoted] = useState(false);
  const [votes, updatevotes] = useState([]);
  const [user, setuser] = useState('loading');
  const [matric, setmatric] = useState('');
  const [sub_conf, setsub_conf] = useState(false);
  const [voterr, setvoterr] = useState(false);
  const [votelength, updatevotelength] = useState({ token: 0 });
  const [post, setPost] = useState(false);
  const [tosubmit, settosubmt] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleVote = (e) => {
    const votedcandidate = candidates[e];

    votes[position] === votedcandidate.matric
      ? updatevotes({ ...votes, [position]: '' })
      : updatevotes({ ...votes, [position]: votedcandidate.matric });
  };

  useEffect(() => {
    let num = 0;
    for (let c in votes) {
      if (votes[c] !== '') {
        num = num + 1;
      } else {
      }
    }
    updatevotelength({ ...votelength, token: num });
  }, [votes]);

  const handleVoteSubmission = async () => {
    setvoterr(true);
    if (matric !== '') {
      const res = await fetch('/api/voters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          votes: votes,
          user: matric,
        }),
      });
      const data = await res.json();

      if (res.status === 200) {
        setvoted(true);
        setmsg(data.message);
      } else {
        setmsg(data.message);
      }
    }
  };

  useEffect(() => {
    const userExist = async () => {
      const query = router.query;
      if (query.y !== undefined) {
        setmatric(query.y + '/' + query.s + '/' + query.c);
        if (query.p === 'Admin') {
          setPost(true);
          console.log(post);
        }
      } else {
        router.push('/login');
      }
    };
    userExist();
    settosubmt(post || voted);
    console.log(voted);
    console.log(post);
    console.log(tosubmit);
  });
  useEffect(() => {
    const fetchVoters = async () => {
      const res = await fetch(`/api/voters/${position}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        setcandidates(data['candidates']);
      } else {
        setcandidates([]);
        setmsg(data['message']);
      }
    };
    fetchVoters();
  }, [position]);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={!voted ? styles.main : styles.main_voted}>
        <div
          className={
            !voted && sub_conf ? styles.sub_conf : styles.sub_conf_hide
          }
        >
          <div className={styles.sub_cont}>
            <h2 className={styles.sub_cont_heading}>Submission Confirmation</h2>
            <p className={styles.sub_cont_msg}>
              You are about to vote for <b>{votelength['token']}</b> candidate
              {votelength['token'] > 1 ? 's' : ''} out of <b>26</b>.{' '}
              <span className={styles.sub_cont_note}>
                Are you okay with that?
              </span>
            </p>
            {votelength['token'] === 0 && (
              <p className={styles.sub_cont_err}>
                <span className={styles.alarm}>NOTE:</span> You can&apos;t
                submit 0 vote.
              </p>
            )}
            <div className={styles.sub_cont_btns}>
              <button
                className={!voterr ? styles.not_sure : styles.not_sure_err}
                type="button"
                onClick={() => {
                  setsub_conf(false);
                }}
              >
                Not at all
              </button>
              <button
                className={
                  votelength['token'] !== 0 && !voterr
                    ? styles.sure
                    : styles.sure_err
                }
                type="button"
                onClick={() => {
                  handleVoteSubmission();
                }}
              >
                Sure
              </button>
            </div>
          </div>
        </div>
        {!voted ? (
          <>
            <div className={styles.content}>
              <form action="#" method="GET" onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.position}>
                  <select
                    name="position"
                    className={styles.position_select}
                    value={position}
                    onChange={(e) => setposition(e.target.value)}
                  >
                    <option value="Most Influential">Most influential </option>
                    <option value="Best photographer of the year">
                      Best photographer of the year
                    </option>
                    <option value="Most Social">Most Social</option>
                    <option value="Face of 100level">Face of 100Level</option>
                    <option value="Face of 200level">Face of 200Level</option>
                    <option value="Face of 300level">Face of 300Level</option>
                    <option value="Face of 400level">Face of 400Level</option>
                    <option value="Face of 500level">Face of 500Level</option>
                    <option value="Slim shady">Slim shady</option>
                    <option value="Mr ebony">Mr ebony</option>
                    <option value="Mrs ebony">Mrs ebony</option>
                    <option value="Fresher with prospect">
                      Fresher with prospect
                    </option>
                    <option value="Most expensive">Most expensive</option>
                    <option value="Face of AEC">Face of AEC</option>
                    <option value="Face of AER">Face of AER</option>
                    <option value="Best class Rep">Best class Rep</option>
                    <option value="Most popular">Most popular</option>
                    <option value="Hour Glass">Hour Glass</option>
                    <option value="Best couple">Best couple</option>
                    <option value="Cool calm, and collected">
                      Cool calm, and collected
                    </option>
                    <option value="Sport person of the Year">
                      Sport person of the Year
                    </option>
                    <option value="Entertainer of the Year">
                      Entertainer of the Year
                    </option>
                    <option value="Most political">Most political</option>
                    <option value="Final year student of the year">
                      Final year student of the year
                    </option>
                    <option value="Mr money with the vibe">
                      Mr money with the vibe
                    </option>
                    <option value="Entrepreneur of the year">
                      Entrepreneur of the year
                    </option>
                  </select>
                </div>
              </form>

              <div className={styles.voters}>
                {candidates.length > 0 ? (
                  candidates.map((candidate, i) => (
                    <div className={styles.profile} key={candidate._id}>
                      <Image
                        className={styles.profile_img}
                        src={candidate.img}
                        alt="Candidate Profile"
                        width={160}
                        height={160}
                      />
                      <div className={styles.profile_cont}>
                        <div className={styles.profile_cont_msg}>
                          <h2 className={styles.fname}>
                            {candidate.fname} {candidate.lname}
                          </h2>
                          <h4 className={styles.nick}>{candidate.nick}</h4>
                          <h4 className={styles.level}>
                            {candidate.level} Level
                          </h4>
                        </div>
                        {!tosubmit ? (
                          <button
                            type="button"
                            className={
                              votes[position] === candidate.matric
                                ? styles.profile_voted
                                : styles.profile_vote
                            }
                            onClick={() => handleVote(i)}
                          >
                            Vote
                            {votes[position] === candidate.matric ? 'd' : ''}
                          </button>
                        ) : (
                          post && (
                            <button
                              type="button"
                              className={styles.profile_vote}
                            >
                              {candidate.vote} votes
                            </button>
                          )
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.loading}>
                    <h1>{msg}</h1>
                  </div>
                )}
                {!tosubmit && (
                  <button
                    type="submit"
                    className={styles.btn}
                    onClick={() => {
                      setsub_conf(true);
                      // handleVoteSubmission();
                    }}
                  >
                    Submit
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className={styles.after_reg}>
            <p>Voting Successful!</p>
            <p>Thank you!!!</p>
            <p className={styles.emoji}>&#128151;</p>
          </div>
        )}
      </main>
    </>
  );
}