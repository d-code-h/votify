import { useEffect, useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/voters.module.css';
// import Card from '../components/Card';

export default function Voters() {
  const [msg, setmsg] = useState('Loading...');
  const [position, setposition] = useState('Most Influential');
  const [candidates, setcandidates] = useState([]);
  const [voted, setvoted] = useState(false);
  const [votes, updatevotes] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleVote = (e) => {
    const votedcandidate = candidates[e];

    if (
      votes.indexOf(votedcandidate.matric) === -1 &&
      candidates.filter((c) => votes.indexOf(c.matric) !== -1).length === 0
    ) {
      const exist = candidates.filter(
        (c) => votes.indexOf(c.matric) !== -1
      ).length;
      updatevotes([...votes, votedcandidate.matric]);
    } else {
      updatevotes(votes.filter((v) => v !== votedcandidate.matric));
    }
  };

  const handleVoteSubmission = async () => {
    const res = await fetch('/api/voters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ votes }),
    });
    const data = await res.json();

    if (res.status === 200) {
      setvoted(true);
      setmsg(data.message);
    } else {
      setmsg(data.message);
    }
  };

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
      <main className={styles.main}>
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
                      <h4 className={styles.level}>{candidate.level} Level</h4>
                    </div>
                    {!voted ? (
                      <button
                        type="button"
                        className={
                          votes.indexOf(candidate.matric) === -1
                            ? styles.profile_vote
                            : styles.profile_voted
                        }
                        onClick={() => handleVote(i)}
                      >
                        Vote
                        {votes.indexOf(candidate.matric) === -1 ? '' : 'd'}
                      </button>
                    ) : (
                      candidate.matric === '2020/4/00001AR' && (
                        <button type="button" className={styles.profile_vote}>
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
            {!voted && (
              <button
                type="submit"
                className={styles.btn}
                onClick={() => {
                  handleVoteSubmission();
                }}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
